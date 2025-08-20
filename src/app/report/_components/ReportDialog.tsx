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

// Form validation schemas for different report types
const baseReportSchema = z.object({
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
  anonymous: z.boolean().default(false),
});

const safetyReportSchema = baseReportSchema.extend({
  urgencyLevel: z.enum(["low", "medium", "high", "critical"]),
  incidentType: z.string().min(1, "Please select an incident type"),
});

const suspiciousActivitySchema = baseReportSchema.extend({
  activityType: z.string().min(1, "Please select an activity type"),
  userProfile: z.string().optional(),
  listingUrl: z.string().optional(),
});

const policyViolationSchema = baseReportSchema.extend({
  violationType: z.string().min(1, "Please select a violation type"),
  affectedContent: z.string().optional(),
});

const technicalIssueSchema = baseReportSchema.extend({
  issueType: z.string().min(1, "Please select an issue type"),
  browserInfo: z.string().optional(),
  stepsToReproduce: z.string().optional(),
});

type ReportType = "safety" | "suspicious" | "policy" | "technical";

type BaseReportData = z.infer<typeof baseReportSchema>;
type SafetyReportData = z.infer<typeof safetyReportSchema>;
type SuspiciousActivityData = z.infer<typeof suspiciousActivitySchema>;
type PolicyViolationData = z.infer<typeof policyViolationSchema>;
type TechnicalIssueData = z.infer<typeof technicalIssueSchema>;

type ReportFormData =
  | BaseReportData
  | SafetyReportData
  | SuspiciousActivityData
  | PolicyViolationData
  | TechnicalIssueData;

interface ReportDialogProps {
  type: ReportType;
  title: string;
  description: string;
  variant: "destructive" | "outline" | "default";
  children: React.ReactNode;
}

export function ReportDialog({
  type,
  title,
  description,
  variant,
  children,
}: ReportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Select the appropriate schema based on report type
  const getSchema = () => {
    switch (type) {
      case "safety":
        return safetyReportSchema;
      case "suspicious":
        return suspiciousActivitySchema;
      case "policy":
        return policyViolationSchema;
      case "technical":
        return technicalIssueSchema;
      default:
        return baseReportSchema;
    }
  };

  const form = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      reporterName: "",
      reporterEmail: "",
      description: "",
      anonymous: false,
      ...(type === "safety" && { urgencyLevel: "", incidentType: "" }),
      ...(type === "suspicious" && {
        activityType: "",
        userProfile: "",
        listingUrl: "",
      }),
      ...(type === "policy" && { violationType: "", affectedContent: "" }),
      ...(type === "technical" && {
        issueType: "",
        browserInfo: "",
        stepsToReproduce: "",
      }),
    },
  });

  async function onSubmit(data: ReportFormData) {
    setIsSubmitting(true);

    try {
      // Simulate API call (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, send to appropriate email endpoint based on type
      const emailMap = {
        safety: "safety@gunex.ca",
        suspicious: "security@gunex.ca",
        policy: "compliance@gunex.ca",
        technical: "support@gunex.ca",
      };

      console.log(`Report submitted to ${emailMap[type]}:`, data);

      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting report:", error);
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
            variant={variant}
            className="w-full"
            onClick={() => setIsOpen(true)}
          >
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-4 py-8">
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
        <Button variant={variant} className="w-full">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
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
                      <FormLabel className="text-sm font-medium">
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

            {/* Type-specific fields */}
            {type === "safety" && (
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
                          <SelectItem value="low">
                            Low - Minor concern
                          </SelectItem>
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
            )}

            {type === "suspicious" && (
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="activityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="scam">Suspected scam</SelectItem>
                          <SelectItem value="fake-profile">
                            Fake profile
                          </SelectItem>
                          <SelectItem value="fraud">
                            Fraudulent listing
                          </SelectItem>
                          <SelectItem value="identity-theft">
                            Identity theft attempt
                          </SelectItem>
                          <SelectItem value="suspicious-pricing">
                            Suspicious pricing
                          </SelectItem>
                          <SelectItem value="license-fraud">
                            License photo requests
                          </SelectItem>
                          <SelectItem value="other">
                            Other suspicious activity
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="userProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Profile (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Username or profile link"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {type === "suspicious" && (
              <FormField
                control={form.control}
                name="listingUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://gunex.ca/listings/..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {type === "policy" && (
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="violationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Violation Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select violation type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="prohibited-items">
                            Prohibited item listing
                          </SelectItem>
                          <SelectItem value="inappropriate-content">
                            Inappropriate content
                          </SelectItem>
                          <SelectItem value="spam">
                            Spam or duplicate listings
                          </SelectItem>
                          <SelectItem value="terms-violation">
                            Terms of service violation
                          </SelectItem>
                          <SelectItem value="misuse">
                            Platform feature misuse
                          </SelectItem>
                          <SelectItem value="other">
                            Other policy violation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="affectedContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Affected Content (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Listing URL or username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {type === "technical" && (
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="issueType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bug">Website bug</SelectItem>
                          <SelectItem value="security">
                            Security vulnerability
                          </SelectItem>
                          <SelectItem value="performance">
                            Performance issue
                          </SelectItem>
                          <SelectItem value="mobile">
                            Mobile app problem
                          </SelectItem>
                          <SelectItem value="account">
                            Account access issue
                          </SelectItem>
                          <SelectItem value="other">
                            Other technical issue
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="browserInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Browser/Device (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Chrome on Windows, Safari on iPhone, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {type === "technical" && (
              <FormField
                control={form.control}
                name="stepsToReproduce"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Steps to Reproduce (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="1. Go to page... 2. Click on... 3. Error occurs..."
                        className="min-h-20 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Description - always required */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide as much detail as possible about the issue..."
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
                variant={type === "safety" ? "destructive" : "default"}
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
