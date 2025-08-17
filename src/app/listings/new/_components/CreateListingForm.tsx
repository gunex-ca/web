"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { type RouterInputs, api } from "~/trpc/react";

type CreateInput = RouterInputs["listing"]["create"];

const CATEGORY_OPTIONS: CreateInput["category"][] = [
  "firearm",
  "ammunition",
  "accessory",
  "parts",
  "optics",
  "apparel",
  "service",
];

const PROVINCE_OPTIONS: NonNullable<CreateInput["province"]>[] = [
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NS",
  "NT",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
];

const FIREARM_TYPE_OPTIONS: NonNullable<CreateInput["firearmType"]>[] = [
  "rifle",
  "shotgun",
  "handgun",
  "carbine",
  "other",
];

const FIREARM_CLASS_OPTIONS: NonNullable<CreateInput["firearmClass"]>[] = [
  "non_restricted",
  "restricted",
  "prohibited",
];

export function CreateListingForm() {
  const router = useRouter();
  const utils = api.useUtils();
  const createMutation = api.listing.create.useMutation({
    onSuccess: async () => {
      // Invalidate listing queries and redirect to home for now
      await utils.listing.getNewest.invalidate();
      router.push("/");
      router.refresh();
    },
  });

  const [category, setCategory] = useState<CreateInput["category"]>("firearm");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [province, setProvince] = useState<CreateInput["province"]>("ON");
  const [city, setCity] = useState("");
  const [firearmType, setFirearmType] =
    useState<CreateInput["firearmType"]>("rifle");
  const [firearmClass, setFirearmClass] =
    useState<CreateInput["firearmClass"]>("non_restricted");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setError("Price must be a number greater than 0");
      return;
    }

    const payload: CreateInput = {
      category,
      title,
      price: numericPrice as unknown as CreateInput["price"],
      description: description || undefined,
      province: province || undefined,
      city: city || undefined,
      firearmType: category === "firearm" ? firearmType : undefined,
      firearmClass: category === "firearm" ? firearmClass : undefined,
      properties: undefined,
      // sellerId, status handled server-side
    } as CreateInput;

    createMutation.mutate(payload, {
      onError: (err) => {
        if (err.data?.code === "UNAUTHORIZED") {
          router.push("/sign-in");
          return;
        }
        setError(err.message || "Failed to create listing");
      },
    });
  }

  const isFirearm = category === "firearm";

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label htmlFor="category" className="font-medium text-sm">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as CreateInput["category"])
          }
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="title" className="font-medium text-sm">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          placeholder="e.g. Ruger 10/22 in great condition"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="price" className="font-medium text-sm">
          Price (CAD)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          placeholder="500.00"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="description" className="font-medium text-sm">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          placeholder="Condition, rounds fired, extras, etc."
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="province" className="font-medium text-sm">
          Province
        </label>
        <select
          id="province"
          name="province"
          value={province ?? ""}
          onChange={(e) =>
            setProvince(e.target.value as CreateInput["province"])
          }
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          required
        >
          {PROVINCE_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="city" className="font-medium text-sm">
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={city ?? ""}
          onChange={(e) => setCity(e.target.value)}
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          placeholder="e.g. Toronto"
          required
        />
      </div>

      {isFirearm ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="firearmType" className="font-medium text-sm">
              Firearm type
            </label>
            <select
              id="firearmType"
              name="firearmType"
              value={firearmType ?? ""}
              onChange={(e) =>
                setFirearmType(
                  e.target.value as NonNullable<CreateInput["firearmType"]>,
                )
              }
              className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              required
            >
              {FIREARM_TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="firearmClass" className="font-medium text-sm">
              Firearm class
            </label>
            <select
              id="firearmClass"
              name="firearmClass"
              value={firearmClass ?? ""}
              onChange={(e) =>
                setFirearmClass(
                  e.target.value as NonNullable<CreateInput["firearmClass"]>,
                )
              }
              className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              required
            >
              {FIREARM_CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        className="w-full"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? "Creating…" : "Create listing"}
      </Button>
    </form>
  );
}
