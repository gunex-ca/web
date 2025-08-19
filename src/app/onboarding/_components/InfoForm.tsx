"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Required } from "~/components/Required";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { SelectUser } from "~/server/db/schema";
import { api } from "~/trpc/react";

// Canadian postal code pattern: A1A 1A1
const CANADIAN_POSTAL_CODE_REGEX = /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i;

// Format Canadian postal code as user types
function formatPostalCode(value: string): string {
  // Remove all non-alphanumeric characters and convert to uppercase
  const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  // Canadian postal code format: A1A 1A1
  if (cleaned.length <= 3) {
    return cleaned;
  }
  if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  }
  // Limit to 6 characters maximum
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .refine(
      (code) => {
        const trimmed = code.trim();
        return CANADIAN_POSTAL_CODE_REGEX.test(trimmed);
      },
      {
        message: "Enter a valid Canadian postal code (e.g., K1A 0A9)",
      },
    ),
});

export const InfoForm: React.FC<{ user: SelectUser }> = ({ user }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name ?? "",
      postalCode: user.postalCode ?? "",
      username: user.username ?? "",
    },
  });

  const postalCode = form.watch("postalCode") ?? user.postalCode ?? "";
  const location = api.location.getPostalCode.useQuery(
    { postalCode: postalCode.replaceAll(" ", "").toUpperCase() },
    { enabled: postalCode !== "" && postalCode.length === 7 },
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <Required />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Postal Code <Required />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="K1A 0A9"
                  maxLength={7}
                  onChange={(e) => {
                    const formatted = formatPostalCode(e.target.value);
                    field.onChange(formatted);
                  }}
                />
              </FormControl>
              {location.data && (
                <FormDescription>
                  {location.data?.city}, {location.data?.province}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </Form>
  );
};
