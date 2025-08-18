import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { ImageUploader } from "./ImageUploader";
import { useListingForm } from "./ListingState";

export const GeneralForm: React.FC = () => {
  const { state, update } = useListingForm();
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Images</Label>
        <ImageUploader />
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={state.title}
          onChange={(e) => update({ title: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Condition</Label>
          <Select
            value={state.condition}
            onValueChange={(value) => update({ condition: value })}
          >
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
            value={Number(state.price)}
            onChange={(e) => update({ price: e.target.valueAsNumber })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Add details..."
          value={state.description}
          onChange={(e) => update({ description: e.target.value })}
        />
      </div>
    </div>
  );
};
