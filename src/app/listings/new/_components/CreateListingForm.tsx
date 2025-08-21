"use client";

import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";
import { Suspense, lazy, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

import { capitalCase } from "change-case";
import { GeneralForm } from "./GeneralForm";
import { type ListingFormState, useListingForm } from "./ListingState";

// Import only the required fields constants, not the components
import { BOW_REQUIRED_FIELDS } from "./properties/BowForm";
import { FIREARMS_REQUIRED_FIELDS } from "./properties/FirearmsForm";
import { AMMO_REQUIRED_FIELDS } from "./properties/LiveAmmoForm";

// Lazy load category-specific forms
const LazyFirearmsForm = lazy(() =>
  import("./properties/FirearmsForm").then((module) => ({
    default: module.FirearmsGunCreateForm,
  }))
);

const LazyAmmoForm = lazy(() =>
  import("./properties/LiveAmmoForm").then((module) => ({
    default: module.AmmoForm,
  }))
);

const LazyBowForm = lazy(() =>
  import("./properties/BowForm").then((module) => ({
    default: module.BowForm,
  }))
);

const categoryForms = {
  "firearms-muzzleloaders": LazyFirearmsForm,
  "firearms-shotguns": LazyFirearmsForm,
  "firearms-handguns": LazyFirearmsForm,
  "firearms-rifles": LazyFirearmsForm,
  "ammunition-live-ammo": LazyAmmoForm,
  "ammunition-dummy-rounds": LazyAmmoForm,
  "archery-bows": LazyBowForm,
} as const;

const getRequiredPropertiesFields = (
  subCategoryId: string
): readonly string[] => {
  switch (subCategoryId) {
    case "firearms-muzzleloaders":
    case "firearms-shotguns":
    case "firearms-handguns":
    case "firearms-rifles":
      return FIREARMS_REQUIRED_FIELDS;
    case "ammunition-live-ammo":
    case "ammunition-dummy-rounds":
      return AMMO_REQUIRED_FIELDS;
    case "archery-bows":
      return BOW_REQUIRED_FIELDS;
    default:
      return [];
  }
};

// Types for validation and form data
type FormErrors = {
  title?: string;
  description?: string;
  price?: string;
  images?: string;
  properties?: Record<string, string>;
};

type CreateListingMutation = ReturnType<typeof api.listing.create.useMutation>;
type PublishListingMutation = ReturnType<
  typeof api.listing.publish.useMutation
>;
type GetPresignedPostMutation = ReturnType<
  typeof api.listing.getImagePresignedPost.useMutation
>;

// Validation function
const validateFormData = (
  state: ListingFormState,
  subCategoryId: string
): FormErrors => {
  const errors: FormErrors = {};

  if (!state.title.trim()) {
    errors.title = "Title is required";
  }

  if (!state.description.trim()) {
    errors.description = "Description is required";
  }

  if (state.price < 0) {
    errors.price = "Price must be greater than or equal to 0";
  }

  if (state.images.length === 0) {
    errors.images = "At least one image is required";
  }

  // Validate properties based on category requirements
  const requiredFields = getRequiredPropertiesFields(subCategoryId);
  const propertyErrors: Record<string, string> = {};

  for (const field of requiredFields) {
    const value = state.properties[field];
    if (!value || String(value).trim() === "") {
      propertyErrors[field] = `${capitalCase(field)} is required`;
    }
  }

  if (Object.keys(propertyErrors).length > 0) {
    errors.properties = propertyErrors;
  }

  return errors;
};

const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 2, // Maximum file size in MB
    maxWidthOrHeight: 5000, // Maximum width or height
    useWebWorker: true,
    initialQuality: 0.8, // Initial compression quality
  };

  try {
    const compressedFile = await imageCompression(file, options);

    // Create a new File object with the original name to preserve it
    return new File([compressedFile], file.name, {
      type: compressedFile.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.warn("Image compression failed, using original file:", error);
    return file; // Fallback to original file if compression fails
  }
};

const uploadImageToS3 = async (
  file: File,
  presignedPost: { url: string; fields: Record<string, string> }
): Promise<void> => {
  const formData = new FormData();

  // Add all required fields from the presigned post
  for (const [key, value] of Object.entries(presignedPost.fields)) {
    formData.append(key, value);
  }

  // The file must be the last field
  formData.append("file", file);

  const response = await fetch(presignedPost.url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.statusText}`);
  }
};

const isImage = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  return validTypes.includes(file.type);
};

// Handle image uploads with compression and S3 upload
const handleImageUploads = async (
  listingId: string,
  images: Array<File>,
  getPresignedPostMutation: GetPresignedPostMutation
): Promise<void> => {
  for (const [index, image] of images.entries()) {
    if (!isImage(image))
      throw new Error(`Invalid image type for image ${index + 1}.`);
  }

  const imageUploadPromises = images.map(async (image, index) => {
    const { presignedUrl } = await getPresignedPostMutation.mutateAsync({
      contentType: image.type as "image/jpeg" | "image/png" | "image/webp",
      alt: `Image ${index + 1}`,
      name: image.name,
      listingId: listingId,
      sortOrder: index,
    });

    try {
      await uploadImageToS3(image, presignedUrl);
    } catch (error) {
      throw new Error(
        `Failed to upload image ${index + 1}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }

    return image;
  });

  await Promise.all(imageUploadPromises);
};

// Create and publish listing with all the necessary steps
const createAndPublishListing = async (
  state: ListingFormState,
  subCategoryId: string,
  createListingMutation: CreateListingMutation,
  publishListingMutation: PublishListingMutation,
  getPresignedPostMutation: GetPresignedPostMutation,
  setUploadStatus: (status: string) => void
) => {
  const compressedFiles = await Promise.all(state.images.map(compressImage));

  if (compressedFiles.length === 0) throw new Error("No images to upload");

  setUploadStatus("Creating listing...");
  const listing = await createListingMutation.mutateAsync({
    title: state.title,
    description: state.description,
    price: state.price.toString(),
    subCategoryId,
    properties: state.properties,
  });

  const { id, publicId } = listing;
  setUploadStatus("Uploading images...");
  await handleImageUploads(id, compressedFiles, getPresignedPostMutation);

  setUploadStatus("Publishing listing...");
  await publishListingMutation.mutateAsync({ publicId });

  return listing;
};

export const CreateListingForm: React.FC<{ subCategoryId: string }> = ({
  subCategoryId,
}) => {
  const { state } = useListingForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const Form = categoryForms[subCategoryId];

  const createListingMutation = api.listing.create.useMutation();
  const publishListingMutation = api.listing.publish.useMutation();
  const getPresignedPostMutation =
    api.listing.getImagePresignedPost.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Clear previous errors and validate form data
    setErrors({});

    const validationErrors = validateFormData(state, subCategoryId);

    // If there are validation errors, set them and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const listing = await createAndPublishListing(
        state,
        subCategoryId,
        createListingMutation,
        publishListingMutation,
        getPresignedPostMutation,
        setUploadStatus
      );

      toast.success("Listing created and published successfully!");
      router.push(`/listings/${listing.publicId}`);
    } catch (error) {
      console.error("Failed to create listing:", error);
      toast.error("Failed to create listing. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadStatus("");
      setErrors({}); // Clear any remaining errors on completion
    }
  };

  // Clear specific errors when user starts editing
  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => {
      const { [field]: _, ...remainingErrors } = prev;
      return remainingErrors;
    });
  };

  // Clear specific property errors
  const clearPropertyError = (propertyField: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors.properties) {
        const { [propertyField]: _, ...remainingProperties } =
          newErrors.properties;

        // If no property errors remain, remove the properties key entirely
        if (Object.keys(remainingProperties).length === 0) {
          const { properties: __, ...errorsWithoutProperties } = newErrors;
          return errorsWithoutProperties;
        }
        newErrors.properties = remainingProperties;
      }
      return newErrors;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="space-y-4">
        <h3 className="font-semibold text-lg">General</h3>
        <GeneralForm errors={errors} onClearError={clearError} />
      </section>

      {Form && (
        <section className="space-y-4">
          <h3 className="font-semibold text-lg">Additional Details</h3>
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <div className="text-muted-foreground text-sm">
                  Loading additional form fields...
                </div>
              </div>
            }
          >
            <Form
              errors={errors.properties}
              onClearError={clearPropertyError}
            />
          </Suspense>
        </section>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? uploadStatus || "Creating..." : "Create"}
      </Button>
    </form>
  );
};
