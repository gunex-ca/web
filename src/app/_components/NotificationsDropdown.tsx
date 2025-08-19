import { Bell, Heart, MessageCircle, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface NotificationsDropdownProps {
  notificationCount?: number;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  notificationCount = 0,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="size-4" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-red-600 text-white text-xs">
              {notificationCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="size-4 text-blue-600" />
            <span className="font-medium">New message</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Someone messaged you about your AR-15 listing
          </p>
          <span className="text-muted-foreground text-xs">5 min ago</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
          <div className="flex items-center gap-2">
            <Heart className="size-4 text-red-600" />
            <span className="font-medium">Item favorited</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Your Glock 19 was added to someone's favorites
          </p>
          <span className="text-muted-foreground text-xs">2 hours ago</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
          <div className="flex items-center gap-2">
            <Package className="size-4 text-green-600" />
            <span className="font-medium">Listing approved</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Your Beretta M9 listing is now live
          </p>
          <span className="text-muted-foreground text-xs">1 day ago</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-3 text-center">
          <Link href="/notifications" className="text-primary text-sm">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
