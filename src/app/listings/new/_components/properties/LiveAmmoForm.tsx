import { Label } from "~/components/ui/label";
import { calibers } from "~/lib/categories/gun-manufacturer";
import { useListingForm } from "../ListingState";
import { ComboBox } from "../inputs/ComboBox";
import { useMount } from "./use-mount";

type AmmoFormProperties = {
  Caliber: string;
};

const defaultProperties: AmmoFormProperties = {
  Caliber: "",
};

export const AmmoForm: React.FC = () => {
  const { state, update } = useListingForm<AmmoFormProperties>();

  useMount(() => {
    update({ properties: defaultProperties });
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Caliber</Label>
        <ComboBox
          value={String(state.properties.Caliber ?? "")}
          onChange={(e) => {
            update({ properties: { ...state.properties, Caliber: e } });
          }}
          options={[
            { label: "(Other)", value: "Other" },
            ...calibers.map((a) => ({ label: a, value: a })),
          ]}
        />
      </div>
    </div>
  );
};
