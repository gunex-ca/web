"use client";

import { Button } from "~/components/ui/button";

import {
  FirearmsRifleCreateForm,
  useFirearmsRifleProperties,
} from "./FirearmsForm";
import { GeneralForm } from "./GeneralForm";

export function CreateListingForm() {
  const firearmRifleProperties = useFirearmsRifleProperties();

  return (
    <form className="space-y-6">
      <section className="space-y-4">
        <h3 className="font-semibold text-lg">General</h3>
        <GeneralForm
          value={{ title: "", description: "", price: 0 }}
          onChange={() => {}}
        />
      </section>

      <section className="space-y-4">
        <h3 className="font-semibold text-lg">Category details</h3>

        <FirearmsRifleCreateForm {...firearmRifleProperties} />
      </section>

      <Button type="submit">Create</Button>
    </form>
  );
}
