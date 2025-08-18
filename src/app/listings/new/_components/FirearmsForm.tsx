import { useMemo, useState } from "react";
import { Label } from "~/components/ui/label";
import {
  actions,
  calibers,
  guns,
  legalClasses,
  manufacturers,
} from "~/lib/categories/gun-manufacturer";
import { ComboBox } from "./ComboBox";
import {
  FirearmsManufacturerInput,
  FirearmsManufacturerModelInput,
} from "./FirearmsInputs";
import { useListingForm } from "./ListingState";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

type FirearmsRifleProperties = {
  manufacturer: string;
  model: string;
  caliber: string;
  action: string;
  legalClass: string;
};

export const useFirearmsRifleProperties = () => {
  const [value, setValue] = useState<FirearmsRifleProperties>({
    manufacturer: "",
    model: "",
    caliber: "",
    action: "",
    legalClass: "",
  });
  return { value, setValue, onChange: setValue };
};

export const FirearmsRifleCreateForm: React.FC = () => {
  const { state, update } = useListingForm();
  const models = useMemo(
    () => guns.filter((g) => g.manufacturer === state.properties.manufacturer),
    [state.properties.manufacturer]
  );

  const model = useMemo(
    () => models.find((m) => m.model === state.properties.model),
    [state.properties.model, models]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Manufacturer</Label>
        <FirearmsManufacturerInput
          value={String(state.properties.manufacturer ?? "")}
          onChange={(e) => {
            update({ properties: { ...state.properties, manufacturer: e } });
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Model</Label>
        <FirearmsManufacturerModelInput
          manufacturer={String(state.properties.manufacturer ?? "")}
          value={String(state.properties.model ?? "")}
          onChange={(e) => {
            const model = models.find((m) => m.model === e);
            if (e === "other") {
              update({
                properties: {
                  ...state.properties,
                  model: e,
                  action: "",
                  legalClass: "",
                  caliber: "",
                },
              });
              return;
            }
            update({
              properties: {
                ...state.properties,
                model: model?.model ?? e,
                action: model?.action ?? "",
                legalClass: model?.legal_class ?? "",
                caliber: model?.calibres[0] ?? "other",
              },
            });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Action</Label>
        <ComboBox
          value={String(state.properties.action ?? "")}
          suggestions={model?.action ? [model.action] : []}
          onChange={(e) => {
            update({ properties: { ...state.properties, action: e } });
          }}
          options={[
            { label: "(Other)", value: "other" },
            ...actions.map((a) => ({ label: a, value: a })),
          ]}
        />
      </div>

      <div className="space-y-2">
        <Label>Classification</Label>
        <ComboBox
          value={String(state.properties.legalClass ?? "")}
          suggestions={model?.legal_class ? [model.legal_class] : []}
          onChange={(e) => {
            update({ properties: { ...state.properties, legalClass: e } });
          }}
          options={legalClasses.map((a) => ({ label: a, value: a }))}
        />
      </div>

      <div className="space-y-2">
        <Label>Caliber</Label>
        <ComboBox
          value={String(state.properties.caliber ?? "")}
          suggestions={model?.calibres}
          onChange={(e) => {
            update({ properties: { ...state.properties, caliber: e } });
          }}
          options={[
            { label: "(Other)", value: "other" },
            { label: "(Multi-caliber)", value: "multi-caliber" },
            ...calibers.map((a) => ({ label: a, value: a })),
          ]}
        />
      </div>

      <div className="space-y-2">
        <Label>Sights</Label>
        <Input
          value={String(state.properties.sights ?? "")}
          onChange={(e) => {
            update({
              properties: { ...state.properties, sights: e.target.value },
            });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Handed</Label>
        <RadioGroup
          value={String(state.properties.handed ?? "")}
          onValueChange={(e) => {
            update({ properties: { ...state.properties, handed: e } });
          }}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="Left Handed" id="r1" />
            <Label htmlFor="r1">Left Handed</Label>
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem value="Right Handed or Ambidextrous" id="r2" />
            <Label htmlFor="r2">Right Handed or Ambidextrous</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
