"use client";

import { Button } from "~/components/ui/button";

import { GeneralForm } from "./GeneralForm";
import { BowForm } from "./properties/BowForm";
import { FirearmsGunCreateForm } from "./properties/FirearmsForm";
import { AmmoForm } from "./properties/LiveAmmoForm";

const categoryForms = {
  "firearms-muzzleloaders": FirearmsGunCreateForm,
  "firearms-shotguns": FirearmsGunCreateForm,
  "firearms-handguns": FirearmsGunCreateForm,
  "firearms-rifles": FirearmsGunCreateForm,
  "ammunition-live-ammo": AmmoForm,
  "ammunition-dummy-rounds": AmmoForm,
  "archery-bows": BowForm,
} as const;

export const CreateListingForm: React.FC<{ subCategoryId: string }> = ({
  subCategoryId,
}) => {
  const Form = categoryForms[subCategoryId];

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="font-semibold text-lg">General</h3>
        <GeneralForm />
      </section>

      {Form && (
        <section className="space-y-4">
          <h3 className="font-semibold text-lg">Additional Details</h3>
          <Form />
        </section>
      )}

      <Button type="submit">Create</Button>
    </div>
  );
};
