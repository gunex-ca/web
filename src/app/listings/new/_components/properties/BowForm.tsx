import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useListingForm } from "../ListingState";
import { ConditionInput } from "../inputs/ConditionInput";
import { useMount } from "./use-mount";

type BowFormProperties = {
  Condition: string;
  "Bow Type": string;
  Handed: string;
};

const defaultProperties: BowFormProperties = {
  Condition: "",
  "Bow Type": "",
  Handed: "",
};

export const BowForm: React.FC = () => {
  const { state, update } = useListingForm<BowFormProperties>();

  useMount(() => {
    update({ properties: defaultProperties });
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Condition</Label>
        <ConditionInput
          value={String(state.properties.Condition ?? "")}
          onChange={(e) => {
            update({ properties: { ...state.properties, Condition: e } });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Bow Type</Label>
        <Select
          value={String(state.properties["Bow Type"] ?? "")}
          onValueChange={(e) => {
            update({ properties: { ...state.properties, "Bow Type": e } });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a bow type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crossbow">Crossbow</SelectItem>
            <SelectItem value="compound">Compound</SelectItem>
            <SelectItem value="traditional">Traditional</SelectItem>
          </SelectContent>
        </Select>
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
