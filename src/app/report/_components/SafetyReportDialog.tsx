"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

const safetyReportSchema = z.object({
  reporterName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  reporterEmail: z
    .string()
    .email("Please enter a valid email address")
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  anonymous: z.boolean(),
  urgencyLevel: z.enum(["low", "medium", "high", "critical"]),
  incidentType: z.string().min(1, "Please select an incident type"),
});

type SafetyReportData = z.infer<typeof safetyReportSchema>;

interface SafetyReportDialogProps {
  children: React.ReactNode;
}

export function SafetyReportDialog({ children }: SafetyReportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<SafetyReportData>({
    resolver: zodResolver(safetyReportSchema),
    defaultValues: {
      reporterName: "",
      reporterEmail: "",
      description: "",
      anonymous: false,
      urgencyLevel: "low",
      incidentType: "",
    },
  });

  async function onSubmit(data: SafetyReportData) {
    setIsSubmitting(true);

    try {
      // Simulate API call (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Safety report submitted to safety@gunex.ca:", data);

      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting safety report:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDialogClose = () => {
    setIsOpen(false);
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => setIsOpen(true)}
          >
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4 py-8 text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <svg
                className="size-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Report Submitted</h3>
              <p className="text-muted-foreground text-sm">
                Thank you for helping keep Gunex safe. We'll review your report
                and take appropriate action within 24-48 hours.
              </p>
            </div>
            <Button onClick={handleDialogClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Report Safety Concern</DialogTitle>
          <DialogDescription>
            Report immediate safety risks, threats, or dangerous behavior that
            requires urgent attention.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Anonymous Reporting Option */}
            <div className="rounded-md bg-muted/50 p-4">
              <FormField
                control={form.control}
                name="anonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-medium text-sm">
                        Submit anonymously
                      </FormLabel>
                      <p className="text-muted-foreground text-xs">
                        We won't be able to follow up with you, but your report
                        will still be investigated.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information (only if not anonymous) */}
            {!form.watch("anonymous") && (
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="reporterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reporterEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Safety-specific fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="urgencyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgency Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low - Minor concern</SelectItem>
                        <SelectItem value="medium">
                          Medium - Moderate risk
                        </SelectItem>
                        <SelectItem value="high">
                          High - Serious risk
                        </SelectItem>
                        <SelectItem value="critical">
                          Critical - Immediate danger
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="incidentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select incident type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="threats">
                          Threats or harassment
                        </SelectItem>
                        <SelectItem value="unsafe-meeting">
                          Unsafe meeting practices
                        </SelectItem>
                        <SelectItem value="illegal-activity">
                          Suspected illegal activity
                        </SelectItem>
                        <SelectItem value="violence">
                          Violence or intimidation
                        </SelectItem>
                        <SelectItem value="unsafe-handling">
                          Unsafe firearm handling
                        </SelectItem>
                        <SelectItem value="other">
                          Other safety concern
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description - always required */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide as much detail as possible about the safety issue..."
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="text-muted-foreground text-xs">
                    {field.value.length}/1000 characters
                  </div>
                </FormItem>
              )}
            />

            {/* Privacy Notice */}
            <div className="rounded-md bg-muted/50 p-4">
              <p className="text-muted-foreground text-sm">
                <strong>Privacy Notice:</strong> Your report will be reviewed by
                our safety team and used only to investigate and resolve the
                issue. We may contact you for additional information if needed.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="destructive"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
