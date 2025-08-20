import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us • GunEx",
  description:
    "Get in touch with the GunEx team. We're here to help with questions, support, and feedback about Canada's firearms marketplace.",
  keywords: [
    "contact gunex",
    "customer support",
    "help center",
    "feedback",
    "technical support",
    "firearms marketplace support",
    "canada",
  ],
  openGraph: {
    title: "Contact Us • GunEx",
    description:
      "Get in touch with the GunEx team. We're here to help with questions, support, and feedback about Canada's firearms marketplace.",
    url: "/contact",
    siteName: "GunEx",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us • GunEx",
    description:
      "Get in touch with the GunEx team. We're here to help with questions, support, and feedback about Canada's firearms marketplace.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-4xl">Contact Us</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We're here to help! Whether you have questions about using GunEx,
              need technical support, or want to provide feedback, we'd love to
              hear from you.
            </p>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">
                      How do I create a listing?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Sign in to your account and click "Post" in the navigation
                      bar. Follow the guided form to create your listing with
                      photos and details.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">
                      How do I report a problem?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Use the "Report" button on any listing or user profile, or
                      contact us directly using the form above.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">
                      Is my personal information safe?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Yes, we use industry-standard encryption and never share
                      your personal information without consent. See our Privacy
                      Policy for details.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">
                      Can I edit my listing?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Yes, go to your profile settings and select "My Listings"
                      to edit or manage your active listings.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">
                      What should I do if I forgot my password?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Click "Forgot Password" on the sign-in page and follow the
                      instructions sent to your email address.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Don't see your question?{" "}
                  <a href="/faq" className="text-primary hover:underline">
                    Visit our FAQ page
                  </a>{" "}
                  or use the contact form above.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Notice */}
          <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="size-5 text-yellow-600 dark:text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm text-yellow-800 dark:text-yellow-200">
                  Emergency or Illegal Activity
                </h3>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  If you suspect illegal activity or have immediate safety
                  concerns, contact local law enforcement immediately (911),
                  then notify us at safety@gunex.ca.
                </p>
              </div>
            </div>
          </div>

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
