"use client";

import {
  AlertTriangle,
  ChevronDown,
  FileText,
  HelpCircle,
  Shield,
} from "lucide-react";
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

export const HelpDropdown: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          Help
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Safety & Support</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/transaction-safety" className="flex items-center gap-2">
            <Shield className="size-4" />
            Transaction Safety
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/safety" className="flex items-center gap-2">
            <AlertTriangle className="size-4" />
            Firearms Safety
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/community" className="flex items-center gap-2">
            <FileText className="size-4" />
            Community Guidelines
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/report" className="flex items-center gap-2">
            <AlertTriangle className="size-4" />
            Report Issue
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/faq" className="flex items-center gap-2">
            <HelpCircle className="size-4" />
            FAQ
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
