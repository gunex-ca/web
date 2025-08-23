import { useMemo } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import { api } from "~/trpc/react";
import { Required } from "../../../../../components/Required";
import { useListingForm } from "../ListingState";
import { ComboBox } from "../inputs/ComboBox";
import { ConditionInput } from "../inputs/ConditionInput";
import {
  FirearmsManufacturerInput,
  FirearmsManufacturerModelInput,
} from "../inputs/FirearmsInputs";
import { useMount } from "./use-mount";

type FirearmsFormProperties = {
  condition: string;
  caliber: string;
  manufacturer: string;
  model: string;
  action: string;
  classification: string;
  handed: string;
  sights: string;
};

const defaultProperties: FirearmsFormProperties = {
  condition: "",
  caliber: "",
  manufacturer: "",
  model: "",
  action: "",
  classification: "",
  handed: "",
  sights: "",
};

export const FIREARMS_REQUIRED_FIELDS = [
  "condition",
  "manufacturer",
  "model",
  "action",
  "classification",
  "caliber",
] as const;

export const FirearmsGunCreateForm: React.FC<{
  errors?: Record<string, string>;
  onClearError?: (field: string) => void;
}> = ({ errors = {}, onClearError }) => {
  const { state, update } = useListingForm<FirearmsFormProperties>();

  useMount(() => {
    update({ properties: defaultProperties });
  });

  const { data: actions = [], isLoading: actionsLoading } =
    api.gun.getActions.useQuery();

  const { data: models = [], isLoading: modelsLoading } =
    api.gun.getModels.useQuery({
      manufacturer: state.properties.manufacturer,
    });

  const { data: legalClasses = [], isLoading: legalClassesLoading } =
    api.gun.getLegalClasses.useQuery({
      manufacturer: state.properties.manufacturer,
      model: state.properties.model,
    });

  const { data: calibers = [], isLoading: calibersLoading } =
    api.gun.getCalibres.useQuery();

  const model = useMemo(
    () => models.find((m) => m.model === state.properties.model),
    [state.properties.model, models],
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>
          Condition <Required />
        </Label>
        <ConditionInput
          value={String(state.properties.condition ?? "")}
          onChange={(e) => {
            update({ properties: { ...state.properties, condition: e } });
            onClearError?.("condition");
          }}
        />
        {errors.condition && (
          <p className="text-destructive text-sm">{errors.condition}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Manufacturer <Required />
        </Label>
        <FirearmsManufacturerInput
          value={String(state.properties.manufacturer ?? "")}
          onChange={(e) => {
            if (e === "Other") {
              update({
                properties: {
                  ...state.properties,
                  manufacturer: e,
                  model: "Other",
                },
              });
            } else {
              update({ properties: { ...state.properties, manufacturer: e } });
            }
            onClearError?.("manufacturer");
          }}
        />
        {errors.manufacturer && (
          <p className="text-destructive text-sm">{errors.manufacturer}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Model <Required />
        </Label>
        <FirearmsManufacturerModelInput
          manufacturer={String(state.properties.manufacturer ?? "")}
          value={String(state.properties.model ?? "")}
          onChange={(e) => {
            const model = models.find((m) => m.model === e);
            if (e === "Other") {
              update({
                properties: {
                  ...state.properties,
                  model: e,
                  action: "",
                  classification: "",
                  caliber: "",
                },
              });
            } else {
              update({
                properties: {
                  ...state.properties,
                  model: model?.model ?? e,
                  action: model?.action ?? "",
                  classification: model?.legal_class ?? "",
                  caliber: model?.calibres[0] ?? "Other",
                },
              });
            }
            onClearError?.("model");
          }}
        />
        {errors.model && (
          <p className="text-destructive text-sm">{errors.model}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Action <Required />
        </Label>
        <ComboBox
          value={String(state.properties.action ?? "")}
          suggestions={model?.action ? [model.action] : []}
          onChange={(e) => {
            update({ properties: { ...state.properties, action: e } });
            onClearError?.("action");
          }}
          options={[...actions.map((a) => ({ label: a, value: a }))]}
        />
        {errors.action && (
          <p className="text-destructive text-sm">{errors.action}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Classification <Required />
        </Label>
        <ComboBox
          value={String(state.properties.classification ?? "")}
          suggestions={model?.legal_class ? [model.legal_class] : []}
          onChange={(e) => {
            update({ properties: { ...state.properties, classification: e } });
            onClearError?.("classification");
          }}
          options={legalClasses.map((a) => ({
            label: a.legal_class,
            value: a.legal_class,
          }))}
        />
        {errors.Classification && (
          <p className="text-destructive text-sm">{errors.Classification}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Caliber <Required />
        </Label>
        <ComboBox
          value={String(state.properties.caliber ?? "")}
          suggestions={model?.calibres}
          onChange={(e) => {
            update({ properties: { ...state.properties, caliber: e } });
            onClearError?.("caliber");
          }}
          options={[
            { label: "(Other)", value: "other" },
            { label: "(Multi-caliber)", value: "multi-caliber" },
            ...calibers.map((a) => ({ label: a, value: a })),
          ]}
        />
        {errors.caliber && (
          <p className="text-destructive text-sm">{errors.caliber}</p>
        )}
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
