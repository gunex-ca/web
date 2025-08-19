import { useMemo } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  actions,
  calibers,
  guns,
  legalClasses,
} from "~/lib/categories/gun-manufacturer";
import { useListingForm } from "../ListingState";
import { ComboBox } from "../inputs/ComboBox";
import { ConditionInput } from "../inputs/ConditionInput";
import {
  FirearmsManufacturerInput,
  FirearmsManufacturerModelInput,
} from "../inputs/FirearmsInputs";
import { Required } from "../../../../../components/Required";
import { useMount } from "./use-mount";

type FirearmsFormProperties = {
  Condition: string;
  Caliber: string;
  Manufacturer: string;
  Model: string;
  Action: string;
  Classification: string;
  Handed: string;
  Sights: string;
};

const defaultProperties: FirearmsFormProperties = {
  Condition: "",
  Caliber: "",
  Manufacturer: "",
  Model: "",
  Action: "",
  Classification: "",
  Handed: "",
  Sights: "",
};

export const FirearmsGunCreateForm: React.FC = () => {
  const { state, update } = useListingForm<FirearmsFormProperties>();

  useMount(() => {
    update({ properties: defaultProperties });
  });

  const models = useMemo(
    () => guns.filter((g) => g.manufacturer === state.properties.Manufacturer),
    [state.properties.Manufacturer]
  );

  const model = useMemo(
    () => models.find((m) => m.model === state.properties.Model),
    [state.properties.Model, models]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>
          Condition <Required />
        </Label>
        <ConditionInput
          value={String(state.properties.Condition ?? "")}
          onChange={(e) => {
            update({ properties: { ...state.properties, Condition: e } });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>
          Manufacturer <Required />
        </Label>
        <FirearmsManufacturerInput
          value={String(state.properties.Manufacturer ?? "")}
          onChange={(e) => {
            if (e === "Other") {
              update({
                properties: {
                  ...state.properties,
                  Manufacturer: e,
                  Model: "Other",
                },
              });
              return;
            }
            update({ properties: { ...state.properties, Manufacturer: e } });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>
          Model <Required />
        </Label>
        <FirearmsManufacturerModelInput
          manufacturer={String(state.properties.Manufacturer ?? "")}
          value={String(state.properties.Model ?? "")}
          onChange={(e) => {
            const model = models.find((m) => m.model === e);
            if (e === "Other") {
              update({
                properties: {
                  ...state.properties,
                  Model: e,
                  Action: "",
                  Classification: "",
                  Caliber: "",
                },
              });
              return;
            }
            update({
              properties: {
                ...state.properties,
                Model: model?.model ?? e,
                Action: model?.action ?? "",
                Classification: model?.legal_class ?? "",
                Caliber: model?.calibres[0] ?? "Other",
              },
            });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>
          Action <Required />
        </Label>
        <ComboBox
          value={String(state.properties.Action ?? "")}
          suggestions={model?.action ? [model.action] : []}
          onChange={(e) => {
            update({ properties: { ...state.properties, Action: e } });
          }}
          options={[...actions.map((a) => ({ label: a, value: a }))]}
        />
      </div>

      <div className="space-y-2">
        <Label>
          Classification <Required />
        </Label>
        <ComboBox
          value={String(state.properties.Classification ?? "")}
          suggestions={model?.legal_class ? [model.legal_class] : []}
          onChange={(e) => {
            update({ properties: { ...state.properties, Classification: e } });
          }}
          options={legalClasses.map((a) => ({ label: a, value: a }))}
        />
      </div>

      <div className="space-y-2">
        <Label>
          Caliber <Required />
        </Label>
        <ComboBox
          value={String(state.properties.Caliber ?? "")}
          suggestions={model?.calibres}
          onChange={(e) => {
            update({ properties: { ...state.properties, Caliber: e } });
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
          value={String(state.properties.Sights ?? "")}
          onChange={(e) => {
            update({
              properties: { ...state.properties, Sights: e.target.value },
            });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Handed</Label>
        <RadioGroup
          value={String(state.properties.Handed ?? "")}
          onValueChange={(e) => {
            update({ properties: { ...state.properties, Handed: e } });
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
