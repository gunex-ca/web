import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy • GunEx",
  description:
    "Read GunEx's privacy policy to understand how we collect, use, and protect your personal information on Canada's firearms marketplace.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "PIPEDA",
    "canadian privacy law",
    "firearms marketplace privacy",
    "user data",
  ],
  openGraph: {
    title: "Privacy Policy • GunEx",
    description:
      "Read GunEx's privacy policy to understand how we collect, use, and protect your personal information on Canada's firearms marketplace.",
    url: "/privacy",
    siteName: "GunEx",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy • GunEx",
    description:
      "Read GunEx's privacy policy to understand how we collect, use, and protect your personal information on Canada's firearms marketplace.",
  },
  alternates: {
    canonical: "/privacy",
  },
};

export default function Privacy() {
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-4xl">Privacy Policy</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information when you use
              GunEx.
            </p>
          </div>

          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Overview
                <Badge
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
                >
                  PIPEDA Compliant
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GunEx ("we," "us," or "our") operates GunEx, Canada's premier
                marketplace for buying and selling firearms, accessories, and
                archery equipment. This Privacy Policy explains how we collect,
                use, disclose, and protect your personal information in
                compliance with Canada's Personal Information Protection and
                Electronic Documents Act (PIPEDA) and applicable provincial
                privacy legislation.
              </p>
              <p>
                By using our services, you consent to the collection, use, and
                disclosure of your personal information as described in this
                policy.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm">
                    Personal Information
                  </h4>
                  <p className="mt-2 text-muted-foreground text-sm">
                    We collect personal information that you provide directly to
                    us, including:
                  </p>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• Name, email address, and postal code</li>
                    <li>
                      • PAL/RPAL license information and verification documents
                    </li>
                    <li>• Profile information and photos</li>
                    <li>• Listing details, photos, and descriptions</li>
                    <li>• Messages and communications with other users</li>
                    <li>
                      • Payment information (processed by third-party providers)
                    </li>
                    <li>• Support inquiries and feedback</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">
                    Automatically Collected Information
                  </h4>
                  <p className="mt-2 text-muted-foreground text-sm">
                    When you use our services, we automatically collect:
                  </p>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>
                      • Device information (browser, operating system, device
                      type)
                    </li>
                    <li>• IP address and approximate location</li>
                    <li>
                      • Usage data (pages viewed, time spent, interactions)
                    </li>
                    <li>• Search queries and preferences</li>
                    <li>• Log files and technical data</li>
                    <li>• Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">
                    Third-Party Information
                  </h4>
                  <p className="mt-2 text-muted-foreground text-sm">
                    We may receive information about you from:
                  </p>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• Government databases (RCMP FRT verification)</li>
                    <li>• Identity verification services</li>
                    <li>• Analytics and advertising partners</li>
                    <li>• Social media platforms (if you choose to connect)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  We use your personal information for the following purposes:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-sm">Core Services</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Account creation and management</li>
                      <li>• License verification and compliance</li>
                      <li>• Listing creation and management</li>
                      <li>• Facilitating user communications</li>
                      <li>• Processing transactions</li>
                      <li>• Customer support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Safety & Security</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Fraud prevention and detection</li>
                      <li>• Legal compliance and law enforcement</li>
                      <li>• Platform security and monitoring</li>
                      <li>• User verification and authentication</li>
                      <li>• Content moderation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      Improvement & Analytics
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Platform improvement and development</li>
                      <li>• Usage analytics and insights</li>
                      <li>• Personalized recommendations</li>
                      <li>• Research and testing</li>
                      <li>• Performance optimization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Communications</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Service notifications and updates</li>
                      <li>• Security alerts</li>
                      <li>• Marketing communications (with consent)</li>
                      <li>• Community guidelines enforcement</li>
                      <li>• Legal notices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                We do not sell your personal information. We may share your
                information in the following limited circumstances:
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm">With Other Users</h4>
                  <p className="text-muted-foreground text-sm">
                    Your profile information, listings, and messages are visible
                    to other users as necessary for the marketplace to function.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Service Providers</h4>
                  <p className="text-muted-foreground text-sm">
                    We share information with trusted third-party service
                    providers who help us operate our platform (hosting, payment
                    processing, customer support, analytics).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Legal Requirements</h4>
                  <p className="text-muted-foreground text-sm">
                    We may disclose information when required by law, court
                    order, or to law enforcement agencies, including compliance
                    with firearms regulations and investigations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Business Transfers</h4>
                  <p className="text-muted-foreground text-sm">
                    In the event of a merger, acquisition, or sale of assets,
                    your information may be transferred to the acquiring entity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                We implement appropriate technical and organizational measures
                to protect your personal information:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-sm">Technical Measures</h4>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• SSL/TLS encryption for data transmission</li>
                    <li>• Encrypted data storage</li>
                    <li>• Regular security audits and testing</li>
                    <li>• Secure access controls</li>
                    <li>• Network security monitoring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">
                    Organizational Measures
                  </h4>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• Limited employee access to personal data</li>
                    <li>• Staff training on privacy and security</li>
                    <li>• Data breach response procedures</li>
                    <li>• Regular policy reviews and updates</li>
                    <li>• Third-party security assessments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Under Canadian privacy law, you have the following rights
                regarding your personal information:
              </p>
              <div className="space-y-3">
                <div className="rounded-md bg-muted/50 p-3">
                  <h4 className="font-semibold text-sm">Access</h4>
                  <p className="text-muted-foreground text-sm">
                    Request access to your personal information we hold
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-3">
                  <h4 className="font-semibold text-sm">Correction</h4>
                  <p className="text-muted-foreground text-sm">
                    Request correction of inaccurate or incomplete information
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-3">
                  <h4 className="font-semibold text-sm">Deletion</h4>
                  <p className="text-muted-foreground text-sm">
                    Request deletion of your personal information (subject to
                    legal obligations)
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-3">
                  <h4 className="font-semibold text-sm">Portability</h4>
                  <p className="text-muted-foreground text-sm">
                    Request a copy of your data in a portable format
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-3">
                  <h4 className="font-semibold text-sm">Consent Withdrawal</h4>
                  <p className="text-muted-foreground text-sm">
                    Withdraw consent for marketing communications or data
                    processing (may limit service functionality)
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                To exercise these rights, contact us at privacy@gunex.ca. We
                will respond to your request within 30 days.
              </p>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                We retain your personal information for as long as necessary to
                provide our services and comply with legal obligations:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Active account data</span>
                  <span className="text-muted-foreground">
                    Duration of account + 1 year
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction records</span>
                  <span className="text-muted-foreground">7 years</span>
                </div>
                <div className="flex justify-between">
                  <span>License verification data</span>
                  <span className="text-muted-foreground">
                    As required by law
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Communications</span>
                  <span className="text-muted-foreground">3 years</span>
                </div>
                <div className="flex justify-between">
                  <span>Analytics data</span>
                  <span className="text-muted-foreground">2 years</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card>
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Your personal information is primarily stored and processed in
                Canada. Some of our service providers may process data in other
                countries with adequate privacy protections. We ensure that any
                international transfers comply with Canadian privacy law and
                include appropriate safeguards.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                GunEx is not intended for use by individuals under 18 years of
                age. We do not knowingly collect personal information from
                children. If you become aware that a child has provided us with
                personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                We use cookies and similar technologies to enhance your
                experience:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-sm">Essential Cookies</h4>
                  <p className="text-muted-foreground text-sm">
                    Required for basic site functionality, security, and user
                    authentication.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Analytics Cookies</h4>
                  <p className="text-muted-foreground text-sm">
                    Help us understand how users interact with our platform to
                    improve services.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Preference Cookies</h4>
                  <p className="text-muted-foreground text-sm">
                    Remember your settings and preferences for a personalized
                    experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Marketing Cookies</h4>
                  <p className="text-muted-foreground text-sm">
                    Used to show relevant advertisements and measure campaign
                    effectiveness (with consent).
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                You can manage cookie preferences through your browser settings
                or our cookie consent tool.
              </p>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                We may update this Privacy Policy periodically to reflect
                changes in our practices, technology, or legal requirements. We
                will notify you of material changes via email or through our
                platform. Continued use of our services after changes become
                effective constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                If you have questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Privacy Officer</strong>
                </div>
                <div>GunEx</div>
                <div>Email: privacy@gunex.ca</div>
                <div>
                  General Contact:{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Contact Form
                  </a>
                </div>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <p className="text-muted-foreground text-sm">
                  <strong>Privacy Complaints:</strong> If you believe we have
                  not properly handled your personal information, you may file a
                  complaint with the Office of the Privacy Commissioner of
                  Canada at priv.gc.ca or 1-800-282-1376.
                </p>
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
