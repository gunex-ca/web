"use client";

import {
  Heart,
  LogOut,
  MessageCircle,
  Package,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { authClient } from "~/lib/auth-client";

type Session = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string | null;
  } | null;
};

interface ProfileDropdownProps {
  session: Session;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  session,
}) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 rounded-full"
        >
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user?.name || "User"}
              className="size-6 rounded-full"
            />
          ) : (
            <User className="size-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{session.user?.name || "User"}</span>
            <span className="font-normal text-muted-foreground text-sm">
              {session.user?.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`/profile/${session.user?.username}`}
            className="flex items-center gap-2"
          >
            <User className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/listings" className="flex items-center gap-2">
            <Package className="size-4" />
            My Listings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/favorites" className="flex items-center gap-2">
            <Heart className="size-4" />
            Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/messages" className="flex items-center gap-2">
            <MessageCircle className="size-4" />
            Messages
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={async () => {
            const result = await authClient.signOut();
            if (result.error) {
              console.error(result.error);
            } else {
              router.push("/");
            }
          }}
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
