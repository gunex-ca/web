import { Bookmark, Flag, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const TitleSection: FC<{ title: string }> = ({ title }) => (
  <div className="flex items-start justify-between gap-4">
    <h1 className="font-semibold text-xl leading-tight">{title}</h1>
  </div>
);

export const ActionsSection: FC = () => (
  <div className="flex items-center gap-2">
    <Button variant="secondary">Message Seller</Button>
    <Button variant="secondary" size="icon">
      <Bookmark />
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/report" className="flex items-center gap-2">
            <Flag className="size-4" />
            <span>Report listing</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
