import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service • GunEx",
  description:
    "Read GunEx's terms of service governing the use of Canada's premier firearms marketplace platform.",
  keywords: [
    "terms of service",
    "user agreement",
    "legal terms",
    "firearms marketplace terms",
    "canadian firearms laws",
    "platform rules",
    "user responsibilities",
  ],
  openGraph: {
    title: "Terms of Service • GunEx",
    description:
      "Read GunEx's terms of service governing the use of Canada's premier firearms marketplace platform.",
    url: "/terms",
    siteName: "GunEx",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service • GunEx",
    description:
      "Read GunEx's terms of service governing the use of Canada's premier firearms marketplace platform.",
  },
  alternates: {
    canonical: "/terms",
  },
};

export default function Terms() {
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-4xl">Terms of Service</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              These terms govern your use of GunEx and outline the rights and
              responsibilities of all users on our platform.
            </p>
          </div>

          {/* Agreement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Agreement to Terms
                <Badge
                  variant="secondary"
                  className="bg-red-500/10 text-red-600 dark:text-red-400"
                >
                  Legally Binding
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                These Terms of Service ("Terms") constitute a legally binding
                agreement between you and GunEx ("GunEx," "we," "us," or "our")
                regarding your use of the GunEx platform, website, and related
                services (collectively, the "Service").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by
                these Terms. If you disagree with any part of these Terms, you
                may not access the Service.
              </p>
              <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-950/20">
                <p className="font-medium text-sm text-yellow-800 dark:text-yellow-200">
                  Important Notice
                </p>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  This platform facilitates firearms transactions. Users must
                  comply with all applicable Canadian federal, provincial, and
                  municipal firearms laws and regulations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle>Eligibility and Account Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">
                  Age and Legal Capacity
                </h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  You must be at least 18 years old and have the legal capacity
                  to enter into contracts to use this Service.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">
                  Firearms License Requirements
                </h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  To purchase or sell firearms, you must possess a valid
                  Possession and Acquisition License (PAL) or Restricted PAL
                  (RPAL) issued by the RCMP, as required by law.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Account Accuracy</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  You must provide accurate, complete, and current information
                  when creating your account and maintain the accuracy of this
                  information.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">
                  One Account Per Person
                </h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  Each individual may maintain only one account. Multiple
                  accounts by the same person are prohibited.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Platform Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Usage Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">Permitted Uses</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Listing legal firearms and accessories for sale</li>
                      <li>• Browsing and purchasing listed items</li>
                      <li>• Communicating with other verified users</li>
                      <li>• Using FRT lookup tools</li>
                      <li>• Reporting violations or safety concerns</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Content Standards</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• All content must be legal and accurate</li>
                      <li>• Photos must be clear and unedited</li>
                      <li>• Descriptions must be honest and complete</li>
                      <li>• No misleading or false information</li>
                      <li>• Respectful communication only</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">
                      Prohibited Activities
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Listing prohibited or illegal items</li>
                      <li>• Fraudulent or deceptive practices</li>
                      <li>• Harassment or threatening behavior</li>
                      <li>• Attempting to bypass license verification</li>
                      <li>• Automated scraping or data mining</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      Technical Restrictions
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• No attempts to hack or breach security</li>
                      <li>• No interference with platform operations</li>
                      <li>• No unauthorized access to user accounts</li>
                      <li>• No distribution of malware or viruses</li>
                      <li>• No reverse engineering of our systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Listing Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Requirements and Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">
                  Seller Responsibilities
                </h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  As a seller, you are solely responsible for:
                </p>
                <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>• Ensuring legal ownership of all listed items</li>
                  <li>• Verifying buyer credentials before transfer</li>
                  <li>• Complying with all firearms transfer regulations</li>
                  <li>• Maintaining accurate inventory and availability</li>
                  <li>• Providing truthful item descriptions and conditions</li>
                  <li>• Completing transactions in good faith</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Required Information</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  All firearm listings must include:
                </p>
                <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>• Make, model, and caliber</li>
                  <li>• Serial number (partially obscured in public view)</li>
                  <li>• Condition and any modifications</li>
                  <li>• Clear, unedited photographs</li>
                  <li>• Asking price and payment terms</li>
                  <li>• General location (city/province)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Legal Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">Firearms Regulations</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  All users must comply with:
                </p>
                <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>• Criminal Code of Canada</li>
                  <li>• Firearms Act and regulations</li>
                  <li>• Provincial firearms legislation</li>
                  <li>• Municipal bylaws and restrictions</li>
                  <li>• RCMP policies and procedures</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm">
                  Law Enforcement Cooperation
                </h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  We cooperate fully with law enforcement investigations and may
                  provide user information when legally required or when we
                  reasonably believe it's necessary to prevent harm.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Export Controls</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  Firearms and related items are subject to export control laws.
                  Cross-border sales are generally prohibited and may require
                  special permits.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payments and Fees */}
          <Card>
            <CardHeader>
              <CardTitle>Payments, Fees, and Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">
                  Transaction Processing
                </h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  GunEx facilitates connections between buyers and sellers but
                  does not process payments directly. Users are responsible for
                  arranging payment and ensuring secure transaction methods.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Platform Fees</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  We may charge fees for certain services. Current fee structure
                  is available on our website and users will be notified of any
                  changes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Dispute Resolution</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  Transaction disputes are between buyers and sellers. While we
                  may provide assistance, we are not responsible for resolving
                  payment or delivery issues.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">Platform Content</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  The GunEx platform, including its design, features, text,
                  graphics, and software, is owned by GunEx and protected by
                  intellectual property laws.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">User Content</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  You retain ownership of content you post but grant us a
                  license to use, display, and distribute it as necessary to
                  operate our Service.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Copyright Compliance</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  Users must not upload copyrighted material without permission.
                  We respond to valid copyright complaints under Canadian law.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Liability and Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle>Liability and Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/20">
                <h4 className="font-semibold text-red-800 text-sm dark:text-red-200">
                  Important Disclaimers
                </h4>
                <div className="mt-2 space-y-2 text-red-700 text-sm dark:text-red-300">
                  <p>
                    • GunEx is a platform that facilitates connections between
                    users; we do not sell firearms directly
                  </p>
                  <p>
                    • We do not guarantee the accuracy of listings or the
                    reliability of users
                  </p>
                  <p>
                    • Users assume all risks associated with transactions and
                    interactions
                  </p>
                  <p>
                    • We are not responsible for the legal compliance of
                    individual transactions
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm">
                  Limitation of Liability
                </h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  To the maximum extent permitted by law, GunEx shall not be
                  liable for any indirect, incidental, special, or consequential
                  damages arising from your use of the Service.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Indemnification</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  You agree to indemnify and hold harmless GunEx from any
                  claims, damages, or expenses arising from your use of the
                  Service or violation of these Terms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Account Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">Termination by User</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  You may terminate your account at any time through your
                  account settings. Termination does not relieve you of any
                  obligations incurred before termination.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Termination by GunEx</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  We may suspend or terminate accounts that violate these Terms,
                  engage in illegal activity, or pose safety risks. We may
                  terminate accounts with or without cause.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Effect of Termination</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  Upon termination, your access to the Service will cease, but
                  certain provisions of these Terms will survive, including
                  liability limitations and dispute resolution clauses.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card>
            <CardHeader>
              <CardTitle>Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                We reserve the right to modify these Terms at any time. Material
                changes will be communicated through email or platform
                notifications. Continued use of the Service after changes become
                effective constitutes acceptance of the modified Terms.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>Governing Law and Jurisdiction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">Applicable Law</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  These Terms are governed by the laws of Canada and the
                  province in which GunEx is incorporated, without regard to
                  conflict of law principles.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Dispute Resolution</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  Any disputes arising from these Terms or your use of the
                  Service will be subject to the exclusive jurisdiction of the
                  courts of Canada.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Severability</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  If any provision of these Terms is found unenforceable, the
                  remaining provisions will remain in full force and effect.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                If you have questions about these Terms of Service, please
                contact us:
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Legal Department</strong>
                </div>
                <div>GunEx</div>
                <div>Email: legal@gunex.ca</div>
                <div>
                  General Contact:{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Contact Form
                  </a>
                </div>
              </div>
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
