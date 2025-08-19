"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { SelectUser } from "~/server/db/schema";
import { api } from "~/trpc/react";

// Canadian postal code validation
const POSTAL_CODE_REGEX =
  /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z]\s?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$/i;

// Zod schema for form validation
const MemberInfoFormSchema = z.object({
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .refine(
      (value) => {
        // Remove spaces and convert to uppercase for validation
        const normalized = value.replace(/\s+/g, "").toUpperCase();

        if (normalized.length !== 6) {
          return false;
        }

        // Format with space: A1A 1A1
        const formatted = `${normalized.slice(0, 3)} ${normalized.slice(3)}`;
        return POSTAL_CODE_REGEX.test(formatted);
      },
      {
        message: "Invalid postal code format (e.g., A1A 1A1)",
      }
    ),
  showPartialPostalCode: z.boolean(),
});

function formatPostalCode(input: string): string {
  // Remove all spaces and convert to uppercase
  const cleaned = input.replace(/\s+/g, "").toUpperCase();

  // Add space after 3rd character if length > 3
  if (cleaned.length > 3) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`;
  }

  return cleaned;
}

const EditProfileFormSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  username: z.string(),
});

export const EditProfileForm: React.FC<{ user: SelectUser }> = ({ user }) => {
  const form = useForm({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      email: user.email ?? "",
      name: user.name ?? "",
      username: user.username ?? "",
    },
    mode: "onBlur",
  });

  const updateUser = api.user.updateUser.useMutation();

  const onSubmit = form.handleSubmit(async (data) => {
    await updateUser.mutateAsync(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="w-[250px]" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="w-[250px]" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="w-[200px]" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-2"
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};

export const EditMemberInfoForm: React.FC<{ user: SelectUser }> = ({
  user,
}) => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(MemberInfoFormSchema),
    defaultValues: {
      postalCode: user.postalCode ?? "",
      showPartialPostalCode: false,
    },
    mode: "onBlur",
  });

  const { handleSubmit, setValue, setError, clearErrors } = form;

  const updateUser = api.user.updateUser.useMutation();

  // Form submission handler wrapped with proper error handling
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Clear previous errors and success state
      clearErrors("root");
      setShowSuccess(false);

      await updateUser.mutateAsync(data);

      // Show success feedback
      setShowSuccess(true);

      // Refresh the page data
      router.refresh();

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      // Handle API errors by setting form-level error
      setError("root", {
        type: "server",
        message:
          error instanceof Error ? error.message : "Failed to update profile",
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {form.formState.errors.root && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4">
            <p className="text-red-800 text-sm">
              {form.formState.errors.root.message}
            </p>
          </div>
        )}

        {showSuccess && (
          <div className="rounded-md border border-green-200 bg-green-50 p-4">
            <p className="text-green-800 text-sm">
              Profile updated successfully!
            </p>
          </div>
        )}
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="A1A 1A1"
                  maxLength={7}
                  className="w-[200px]"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Limit input to 7 characters (6 + 1 space)
                    if (value.length <= 7) {
                      const formatted = formatPostalCode(value);
                      setValue("postalCode", formatted, {
                        shouldValidate: true,
                      });
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="showPartialPostalCode"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal text-sm">
                Show only first 3 characters of my postal code
              </FormLabel>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-2"
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};
