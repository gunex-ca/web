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
import { useListingForm } from "./ListingState";
import { ImageUploader } from "./inputs/ImageUploader";

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

      <div className="space-y-2">
        <Label>Price</Label>
        <Input
          value={Number(state.price)}
          onChange={(e) => update({ price: e.target.valueAsNumber })}
        />
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
