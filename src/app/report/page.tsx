import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { SafetyReportDialog } from "./_components/SafetyReportDialog";
import { SuspiciousActivityReportDialog } from "./_components/SuspiciousActivityReportDialog";
import { PolicyViolationReportDialog } from "./_components/PolicyViolationReportDialog";
import { TechnicalIssueReportDialog } from "./_components/TechnicalIssueReportDialog";

export const metadata: Metadata = {
  title: "Report an Issue • Gunex",
  description:
    "Report safety concerns, suspicious activity, policy violations, or other issues on Gunex. Help us maintain a safe and secure firearms marketplace for all Canadian users.",
  keywords: [
    "report issue",
    "safety concerns",
    "suspicious activity",
    "scam reporting",
    "policy violation",
    "firearms marketplace safety",
    "user reporting",
    "security concerns",
  ],
  openGraph: {
    title: "Report an Issue • Gunex",
    description:
      "Report safety concerns, suspicious activity, policy violations, or other issues on Gunex. Help us maintain a safe and secure firearms marketplace for all Canadian users.",
    url: "/report",
    siteName: "Gunex",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Report an Issue • Gunex",
    description:
      "Report safety concerns, suspicious activity, policy violations, or other issues on Gunex. Help us maintain a safe and secure firearms marketplace for all Canadian users.",
  },
  alternates: {
    canonical: "/report",
  },
};

export default function Report() {
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-4xl">Report an Issue</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Help us maintain a safe and secure marketplace by reporting
              suspicious activity, policy violations, or safety concerns. Your
              reports are confidential and help protect our community.
            </p>
          </div>

          {/* Emergency Notice */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                  <svg
                    className="size-4 text-red-600 dark:text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Emergency Situations
                <Badge variant="destructive">Call 911 First</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/20">
                <p className="font-medium text-red-800 text-sm dark:text-red-200">
                  If you are in immediate danger or suspect illegal activity
                </p>
                <p className="mt-1 text-red-700 text-sm dark:text-red-300">
                  Contact local law enforcement immediately by calling 911, then
                  report the incident to us using the methods below. Do not
                  delay emergency response to file a platform report first.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reporting Categories */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Safety Concerns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                    <svg
                      className="size-4 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </span>
                  Safety Concerns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Report immediate safety risks, threats, or dangerous behavior.
                </p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Threats or harassment</li>
                  <li>• Unsafe meeting locations or practices</li>
                  <li>• Users encouraging illegal activity</li>
                  <li>• Violence or intimidation</li>
                  <li>• Unsafe firearm handling</li>
                </ul>
                <SafetyReportDialog>Report Safety Issue</SafetyReportDialog>
              </CardContent>
            </Card>

            {/* Suspicious Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                    <svg
                      className="size-4 text-yellow-600 dark:text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  Suspicious Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Report suspected scams, fraud, or other suspicious behavior.
                </p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Suspected scammers or fake profiles</li>
                  <li>• Fraudulent listings or payments</li>
                  <li>• Identity theft attempts</li>
                  <li>• Suspicious pricing or deals</li>
                  <li>• Users requesting license photos</li>
                </ul>
                <SuspiciousActivityReportDialog>
                  Report Suspicious Activity
                </SuspiciousActivityReportDialog>
              </CardContent>
            </Card>

            {/* Policy Violations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <svg
                      className="size-4 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                  Policy Violations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Report violations of our community guidelines or terms of
                  service.
                </p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Prohibited item listings</li>
                  <li>• Inappropriate content or language</li>
                  <li>• Spam or multiple accounts</li>
                  <li>• Terms of service violations</li>
                  <li>• Misuse of platform features</li>
                </ul>
                <PolicyViolationReportDialog>
                  Report Policy Violation
                </PolicyViolationReportDialog>
              </CardContent>
            </Card>

            {/* Technical Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <svg
                      className="size-4 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  Technical Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Report website bugs, security vulnerabilities, or technical
                  problems.
                </p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Website bugs or errors</li>
                  <li>• Security vulnerabilities</li>
                  <li>• Performance issues</li>
                  <li>• Mobile app problems</li>
                  <li>• Account access issues</li>
                </ul>
                <TechnicalIssueReportDialog>
                  Report Technical Issue
                </TechnicalIssueReportDialog>
              </CardContent>
            </Card>
          </div>

          {/* In-Platform Reporting */}
          <Card>
            <CardHeader>
              <CardTitle>In-Platform Reporting Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                For many issues, you can report directly through the platform:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md bg-muted/50 p-4">
                  <h4 className="font-semibold text-sm">Report Listings</h4>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Use the "Report" button on any suspicious or inappropriate
                    listing to flag it for immediate review.
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-4">
                  <h4 className="font-semibold text-sm">Report Users</h4>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Visit a user's profile and use the "Report User" option to
                    report suspicious behavior or policy violations.
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-4">
                  <h4 className="font-semibold text-sm">Message Reporting</h4>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Report inappropriate messages or harassment directly from
                    your message conversations.
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-4">
                  <h4 className="font-semibold text-sm">Review Disputes</h4>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Contest unfair reviews through your profile settings if they
                    violate our review policies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card>
            <CardHeader>
              <CardTitle>What Happens After You Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      1
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm">Immediate Review</h4>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Our safety team reviews all reports within 4 hours. Critical
                    safety issues are escalated immediately.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <span className="font-bold text-green-600 dark:text-green-400">
                      2
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm">Investigation</h4>
                  <p className="mt-1 text-muted-foreground text-sm">
                    We thoroughly investigate reports, gathering evidence and
                    interviewing involved parties as needed.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      3
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm">Action Taken</h4>
                  <p className="mt-1 text-muted-foreground text-sm">
                    Appropriate action is taken, from warnings to account
                    suspension. You'll receive an update within 48 hours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">
                    Government Reporting
                  </h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• RCMP Canadian Firearms Program: 1-800-731-4000</li>
                    <li>• Crime Stoppers: 1-800-222-8477</li>
                    <li>• Canadian Anti-Fraud Centre: 1-888-495-8501</li>
                    <li>• Local law enforcement: 911 (emergencies)</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Platform Resources</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>
                      •{" "}
                      <a
                        href="/transaction-safety"
                        className="text-primary hover:underline"
                      >
                        Transaction Safety Guide
                      </a>
                    </li>
                    <li>
                      •{" "}
                      <a
                        href="/safety"
                        className="text-primary hover:underline"
                      >
                        Firearms Safety Guidelines
                      </a>
                    </li>
                    <li>
                      •{" "}
                      <a
                        href="/community"
                        className="text-primary hover:underline"
                      >
                        Community Guidelines
                      </a>
                    </li>
                    <li>
                      •{" "}
                      <a
                        href="/contact"
                        className="text-primary hover:underline"
                      >
                        General Contact Form
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Anonymous Reporting */}
          <Card>
            <CardHeader>
              <CardTitle>Anonymous Reporting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                All reports are treated confidentially, and your identity is
                protected. While providing contact information helps us follow
                up on your report, you can submit anonymous reports if
                preferred. However, we may not be able to provide updates on
                anonymous reports.
              </p>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <div className="text-center text-muted-foreground text-sm">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </main>
    </>
  );
}
