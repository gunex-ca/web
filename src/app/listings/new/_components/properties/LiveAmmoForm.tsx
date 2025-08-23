import { Label } from "~/components/ui/label";
import { calibers } from "~/lib/categories/gun-manufacturer";
import { api } from "~/trpc/react";
import { useListingForm } from "../ListingState";
import { ComboBox } from "../inputs/ComboBox";
import { useMount } from "./use-mount";

type AmmoFormProperties = {
  caliber: string;
};

const defaultProperties: AmmoFormProperties = {
  caliber: "",
};

export const AMMO_REQUIRED_FIELDS = [
  // Currently no required fields for ammo
] as const;

export const AmmoForm: React.FC<{
  errors?: Record<string, string>;
  onClearError?: (field: string) => void;
}> = ({ errors = {} }) => {
  const { state, update } = useListingForm<AmmoFormProperties>();

  useMount(() => {
    update({ properties: defaultProperties });
  });

  const { data: calibers, isLoading } = api.gun.getCalibres.useQuery();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Caliber</Label>
        <ComboBox
          value={String(state.properties.caliber ?? "")}
          onChange={(e) => {
            update({ properties: { ...state.properties, caliber: e } });
          }}
          placeholder={isLoading ? "Loading..." : ""}
          disabled={isLoading}
          options={[
            { label: "(Other)", value: "Other" },
            ...(calibers?.map((a) => ({ label: a, value: a })) ?? []),
          ]}
        />
        {errors.caliber && (
          <p className="text-destructive text-sm">{errors.caliber}</p>
        )}
      </div>
    </div>
  );
};
