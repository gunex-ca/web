"use client";

import { Button } from "~/components/ui/button";

import { FirearmsRifleCreateForm } from "./FirearmsForm";
import { GeneralForm } from "./GeneralForm";

export function CreateListingForm() {
  return (
    <form className="space-y-6">
      <section className="space-y-4">
        <h3 className="font-semibold text-lg">General</h3>
        <GeneralForm />
      </section>

      <section className="space-y-4">
        <h3 className="font-semibold text-lg">Category details</h3>

        <FirearmsRifleCreateForm />
      </section>

      <Button type="submit">Create</Button>
    </form>
  );
}
