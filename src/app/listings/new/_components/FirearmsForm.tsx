import { Label } from "~/components/ui/label";
import { ComboBox } from "./ComboBox";
import {
  actions,
  calibers,
  guns,
  legalClasses,
  manufacturers,
} from "~/lib/categories/gun-manufacturer";
import { useMemo, useState } from "react";

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

export const FirearmsRifleCreateForm: React.FC<{
  value: FirearmsRifleProperties;
  onChange?: (value: FirearmsRifleProperties) => void;
}> = ({ value, onChange }) => {
  const models = useMemo(
    () => guns.filter((g) => g.manufacturer === value.manufacturer),
    [value.manufacturer]
  );

  const model = useMemo(
    () => models.find((m) => m.model === value.model),
    [value.model, models]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Manufacturer</Label>
        <ComboBox
          value={value.manufacturer}
          onChange={(e) => {
            onChange?.({ ...value, manufacturer: e });
          }}
          options={[
            { label: "(Other)", value: "other" },
            ...manufacturers.map((m) => ({ label: m, value: m })),
          ]}
        />
      </div>
      <div className="space-y-2">
        <Label>Model</Label>
        <ComboBox
          disabled={value.manufacturer === "" || value.manufacturer === "other"}
          empty={value.manufacturer === "other" ? "Enter model" : "Other"}
          value={value.model}
          onChange={(e) => {
            const model = models.find((m) => m.model === e);
            if (e === "other") {
              onChange?.({
                ...value,
                model: e,
                action: "",
                legalClass: "",
                caliber: "",
              });
              return;
            }
            onChange?.({
              ...value,
              model: model?.model ?? e,
              action: model?.action ?? "",
              legalClass: model?.legal_class ?? "",
              caliber: model?.calibres[0] ?? "other",
            });
          }}
          options={[
            { label: "(Other)", value: "other" },
            ...models.map((m) => ({ label: m.model, value: m.model })),
          ]}
        />
      </div>

      <div className="space-y-2">
        <Label>Action</Label>
        <ComboBox
          value={value.action}
          suggestions={model?.action ? [model.action] : []}
          onChange={(e) => {
            onChange?.({ ...value, action: e });
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
          value={value.legalClass}
          suggestions={model?.legal_class ? [model.legal_class] : []}
          onChange={(e) => {
            onChange?.({ ...value, legalClass: e });
          }}
          options={legalClasses.map((a) => ({ label: a, value: a }))}
        />
      </div>
      <div className="space-y-2">
        <Label>Caliber</Label>
        <ComboBox
          value={value.caliber}
          suggestions={model?.calibres}
          onChange={(e) => {
            onChange?.({ ...value, caliber: e });
          }}
          options={[
            { label: "(Other)", value: "other" },
            { label: "(Multi-caliber)", value: "multi-caliber" },
            ...calibers.map((a) => ({ label: a, value: a })),
          ]}
        />
      </div>
    </div>
  );
};
