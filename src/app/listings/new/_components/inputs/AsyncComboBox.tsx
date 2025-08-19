"use client";

import { CheckIcon, ChevronsUpDownIcon, Loader2 } from "lucide-react";
import type React from "react";
import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/components/utils";

export const AsyncComboBox: React.FC<{
  placeholder?: string;
  disabled?: boolean;
  empty?: ReactNode;
  value?: string;
  onSearchChange?: (value: string) => void;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
  suggestions?: string[];
  isLoading?: boolean;
}> = (props) => {
  const {
    onSearchChange,
    onChange,
    placeholder = "",
    empty,
    value,
    options,
    disabled,
    suggestions,
    isLoading,
  } = props;
  const [open, setOpen] = useState(false);

  const suggestedOptions = options
    .filter((o) => (suggestions ?? []).includes(o.value))
    .sort((a, b) => a.label.localeCompare(b.label));

  const nonSuggestedOptions = options
    .filter((o) => !(suggestions ?? []).includes(o.value))
    .sort((a, b) => a.label.localeCompare(b.label));

  const orderedOptions =
    suggestedOptions.length > 0
      ? [...suggestedOptions, ...nonSuggestedOptions]
      : options;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span>
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
          </span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: "var(--radix-popover-trigger-width)" }}
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            isLoading={isLoading}
            placeholder={placeholder}
            onValueChange={(value) => {
              onSearchChange?.(value);
            }}
          />

          <CommandList>
            {empty && <CommandEmpty>{empty}</CommandEmpty>}
            <CommandGroup>
              {orderedOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange?.(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                  {suggestions?.includes(option.value) && (
                    <Badge variant="outline" className="ml-2">
                      Suggested
                    </Badge>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
