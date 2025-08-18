import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ImageUploader } from "./ImageUploader";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

type GeneralFormProps = {
  title: string;
  description: string;
  price: number;
};

export const GeneralForm: React.FC<{
  value: GeneralFormProps;
  onChange: (value: GeneralFormProps) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Images</Label>
        <ImageUploader />
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Condition</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Price</Label>
          <Input
            value={value.price}
            onChange={(e) =>
              onChange({ ...value, price: e.target.valueAsNumber })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Add details..."
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
        />
      </div>
    </div>
  );
};
