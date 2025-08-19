import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function ConditionInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="New">New</SelectItem>
        <SelectItem value="Excellent">Excellent</SelectItem>
        <SelectItem value="Good">Good</SelectItem>
        <SelectItem value="Fair">Fair</SelectItem>
        <SelectItem value="Poor">Poor</SelectItem>
      </SelectContent>
    </Select>
  );
}
