import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Community Guidelines • GunEx",
  description:
    "Read our community guidelines to learn how to be a responsible member of the GunEx marketplace community.",
  keywords: [
    "community guidelines",
    "marketplace rules",
    "user conduct",
    "safety guidelines",
    "responsible selling",
    "firearms community",
    "Canada",
  ],
  openGraph: {
    title: "Community Guidelines • GunEx",
    description:
      "Read our community guidelines to learn how to be a responsible member of the GunEx marketplace community.",
    url: "/community",
    siteName: "GunEx",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Community Guidelines • GunEx",
    description:
      "Read our community guidelines to learn how to be a responsible member of the GunEx marketplace community.",
  },
  alternates: {
    canonical: "/community",
  },
};

export default function Community() {
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-4xl">Community Guidelines</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Our community guidelines help create a safe, respectful, and legal
              environment for all members of the GunEx marketplace.
            </p>
          </div>

          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Our Community Values
                <Badge
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
                >
                  Safety First
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GunEx is built on trust, safety, and respect for Canadian
                firearms laws. Our community guidelines ensure that all
                transactions are conducted legally, ethically, and safely.
              </p>
              <p>
                By using GunEx, you agree to follow these guidelines and help us
                maintain a positive community for all Canadian firearms
                enthusiasts.
              </p>
            </CardContent>
          </Card>

          {/* Legal Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Legal Compliance
                <Badge variant="destructive" className="text-xs">
                  Required
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Firearms Laws</h4>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>
                    • All users must possess valid PAL/RPAL licenses when
                    creating listings for items that require a PAL/RPAL license
                  </li>
                  <li>
                    • Only list firearms legal for civilian ownership in Canada
                  </li>
                  <li>
                    • Follow all federal, provincial, and municipal regulations
                  </li>
                  <li>
                    • Verify buyer credentials before completing transfers
                  </li>
                  <li>• Maintain proper documentation for all transactions</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Prohibited Items</h4>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Prohibited firearms (full-auto, converted, etc.)</li>
                  <li>• Prohibited accessories (suppressors, etc.)</li>
                  <li>• Stolen or illegally obtained items</li>
                  <li>• Items with removed or altered serial numbers</li>
                  <li>• Explosive devices or dangerous goods</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Community Standards */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Respectful Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Use professional, courteous language</li>
                  <li>• Respect other users' opinions and preferences</li>
                  <li>• No harassment, threats, or discriminatory language</li>
                  <li>• Keep discussions relevant and constructive</li>
                  <li>• Report inappropriate behavior promptly</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Honest Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Provide accurate item descriptions</li>
                  <li>• Use clear, unedited photos</li>
                  <li>• Disclose all defects and modifications</li>
                  <li>• Honor agreed-upon prices and terms</li>
                  <li>• Complete transactions promptly</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• One account per person</li>
                  <li>• Verify your identity when requested</li>
                  <li>• Keep your contact information current</li>
                  <li>• Protect your account credentials</li>
                  <li>• Report suspicious activity</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safe Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Meet in safe, public locations</li>
                  <li>• Bring a knowledgeable friend if needed</li>
                  <li>• Inspect items before completing purchase</li>
                  <li>• Use secure payment methods</li>
                  <li>• Trust your instincts about deals/people</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Listing Standards */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">
                      Required Information
                    </h4>
                    <ul className="ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Make, model, and serial number</li>
                      <li>• Accurate condition description</li>
                      <li>• Clear photos of all angles</li>
                      <li>• Honest price and payment terms</li>
                      <li>• Your general location (city/province)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Photo Guidelines</h4>
                    <ul className="ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Well-lit, clear images</li>
                      <li>• Show serial numbers when required</li>
                      <li>• Include photos of any defects</li>
                      <li>• Maximum 10 photos per listing</li>
                      <li>• No watermarks or promotional content</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">
                      Prohibited Listings
                    </h4>
                    <ul className="ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Items not legally owned by seller</li>
                      <li>• Duplicate or spam listings</li>
                      <li>• Auctions or bidding systems</li>
                      <li>• Services unrelated to firearms</li>
                      <li>• External website links in descriptions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      Pricing Guidelines
                    </h4>
                    <ul className="ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Set realistic, fair market prices</li>
                      <li>• No artificially inflated prices</li>
                      <li>• Clearly state if price is negotiable</li>
                      <li>• Include or exclude shipping costs</li>
                      <li>• No bait-and-switch tactics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enforcement */}
          <Card>
            <CardHeader>
              <CardTitle>Enforcement and Consequences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Violations of our community guidelines may result in the
                following actions:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-sm">Warning System</h4>
                  <ul className="ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• First violation: Written warning</li>
                    <li>• Second violation: Temporary suspension</li>
                    <li>• Serious violations: Immediate suspension</li>
                    <li>• Illegal activity: Permanent ban + reporting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Appeal Process</h4>
                  <ul className="ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• Contact support within 30 days</li>
                    <li>• Provide evidence and explanation</li>
                    <li>• Review by moderation team</li>
                    <li>• Final decision within 5 business days</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting */}
          <Card>
            <CardHeader>
              <CardTitle>Reporting Violations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Help us maintain a safe community by reporting violations
                promptly. Your reports are confidential and help protect all
                users.
              </p>
              <div className="space-y-2">
                <p className="font-medium text-sm">How to Report:</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Use the "Report" button on listings or profiles</li>
                  <li>• Email: safety@gunex.ca</li>
                  <li>
                    • Online form:{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      Contact page
                    </a>
                  </li>
                </ul>
              </div>
              <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-950/20">
                <p className="font-medium text-sm text-yellow-800 dark:text-yellow-200">
                  Emergency or Illegal Activity
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  If you suspect illegal activity or have safety concerns,
                  contact local law enforcement immediately, then notify us.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Guideline Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                We may update these guidelines periodically to reflect changes
                in laws, regulations, or community needs. Significant changes
                will be announced to all users via email and platform
                notifications. Continued use of GunEx constitutes acceptance of
                updated guidelines.
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
