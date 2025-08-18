import type { FC } from "react";
import { Send } from "lucide-react";
import { Button } from "~/components/ui/button";

export const MessageForm: FC = () => (
  <form className="">
    <div>
      <label htmlFor="sidebar-message" className="sr-only">
        Message
      </label>
      <textarea
        id="sidebar-message"
        name="message"
        rows={3}
        placeholder="Write a message to the seller..."
        className="w-full resize-none rounded-md border bg-background p-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />
    </div>
    <Button type="submit" className="w-full shrink-0">
      <Send className="size-4" />
      Send
    </Button>
  </form>
);
