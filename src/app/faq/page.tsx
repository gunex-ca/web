import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Frequently Asked Questions • GunEx",
  description:
    "Find answers to common questions about using GunEx, Canada's premier firearms marketplace. Get help with accounts, transactions, and legal compliance.",
  keywords: [
    "FAQ",
    "frequently asked questions",
    "gunex help",
    "firearms marketplace help",
    "canadian firearms questions",
    "buying selling help",
    "account support",
  ],
  openGraph: {
    title: "Frequently Asked Questions • GunEx",
    description:
      "Find answers to common questions about using GunEx, Canada's premier firearms marketplace. Get help with accounts, transactions, and legal compliance.",
    url: "/faq",
    siteName: "GunEx",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Frequently Asked Questions • GunEx",
    description:
      "Find answers to common questions about using GunEx, Canada's premier firearms marketplace. Get help with accounts, transactions, and legal compliance.",
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQ() {
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-4xl">Frequently Asked Questions</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Find quick answers to common questions about using GunEx. Can't
              find what you're looking for? Contact our support team.
            </p>
          </div>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Quick Navigation
                <Badge
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
                >
                  Jump to Section
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
                <a
                  href="#getting-started"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  Getting Started
                </a>
                <a
                  href="#account-verification"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  Account & Verification
                </a>
                <a
                  href="#buying-selling"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  Buying & Selling
                </a>
                <a
                  href="#legal-compliance"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  Legal Compliance
                </a>
                <a
                  href="#safety-security"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  Safety & Security
                </a>
                <a
                  href="#technical-support"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  Technical Support
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <Card id="getting-started">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  What is GunEx and how does it work?
                </h4>
                <p className="text-muted-foreground text-sm">
                  GunEx is Canada's premier online marketplace for buying and
                  selling firearms, accessories, and archery equipment. We
                  connect licensed buyers and sellers while ensuring all
                  transactions comply with Canadian firearms laws. Users can
                  browse listings, contact sellers, and arrange safe, legal
                  transactions.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Who can use GunEx?</h4>
                <p className="text-muted-foreground text-sm">
                  GunEx is available to Canadian residents who are 18 years or
                  older and possess valid PAL (Possession and Acquisition
                  License) or RPAL (Restricted PAL) licenses as required by law.
                  All users must comply with federal, provincial, and municipal
                  firearms regulations.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How much does it cost to use GunEx?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Creating an account and browsing listings is free. We may
                  charge fees for certain premium features or services. Any
                  applicable fees will be clearly displayed before you commit to
                  a transaction or service.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Does it cost money to post listings on GunEx?
                </h4>
                <p className="text-muted-foreground text-sm">
                  GunEx is dedicated to keeping basic listing services
                  accessible for personal use. Individual users can typically
                  post a limited number of listings for free. If you need to
                  post many listings simultaneously or use advanced features,
                  premium plans may apply. Business accounts and high-volume
                  sellers may be subject to monthly or annual fees. Check your
                  account dashboard for current pricing and limits.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  What types of items can be listed on GunEx?
                </h4>
                <p className="text-muted-foreground text-sm">
                  You can list legal firearms, ammunition, accessories, parts,
                  and archery equipment that are permitted for civilian
                  ownership in Canada. Prohibited items, modified firearms, and
                  anything illegal under Canadian law cannot be listed. See our{" "}
                  <a href="/community" className="text-primary hover:underline">
                    community guidelines
                  </a>{" "}
                  for complete details.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  What is a PAL and how do I get one?
                </h4>
                <p className="text-muted-foreground text-sm">
                  PAL stands for Possession and Acquisition License. This is
                  what you need to buy or possess firearms in Canada. You can
                  get one by taking the Canadian Firearms Safety Course (CFSC).
                  Check online or contact local businesses that provide this
                  service. They can guide you through the application process
                  once you complete the course and test. For more information,
                  visit the{" "}
                  <a
                    href="https://www.rcmp-grc.gc.ca/en/firearms"
                    className="text-primary hover:underline"
                  >
                    RCMP Canadian Firearms Program
                  </a>{" "}
                  or call 1-800-731-4000.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Do I need a PAL to purchase ammunition?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Yes, you need a valid PAL to purchase ammunition in Canada.
                  This requirement helps ensure that only licensed individuals
                  have access to ammunition.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Do I need a PAL to purchase all firearms?
                </h4>
                <p className="text-muted-foreground text-sm">
                  There are currently a few exceptions where you do not need a
                  PAL: flintlock muzzleloading rifles, airguns with a rated
                  velocity of less than 500 feet per second, and firearms
                  classified as having "antique status." However, laws can
                  change, so verify current information with the{" "}
                  <a
                    href="https://www.rcmp-grc.gc.ca/en/firearms"
                    className="text-primary hover:underline"
                  >
                    RCMP
                  </a>{" "}
                  at 1-800-731-4000.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account & Verification */}
          <Card id="account-verification">
            <CardHeader>
              <CardTitle>Account & Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I create an account?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Click "Sign Up" in the top navigation, provide your email
                  address and create a secure password. You'll need to verify
                  your email address and complete your profile with required
                  information including your PAL/RPAL license details.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How long does account verification take?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Basic account verification typically takes 24-48 hours.
                  Additional verification for specific features may take longer.
                  You'll receive email notifications when your verification
                  status changes.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Can I have multiple accounts?
                </h4>
                <p className="text-muted-foreground text-sm">
                  No, each person may only maintain one account on GunEx.
                  Multiple accounts by the same individual are prohibited and
                  may result in account suspension or termination.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  I forgot my password. How do I reset it?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Click "Forgot Password" on the sign-in page and enter your
                  email address. We'll send you instructions to reset your
                  password. If you don't receive the email, check your spam
                  folder or contact support.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  I'm having trouble logging into my account
                </h4>
                <p className="text-muted-foreground text-sm">
                  First, ensure you're using the correct email address and
                  password. Check if Caps Lock is on. Try clearing your
                  browser's cache and cookies, then attempt to log in again. If
                  you signed up for our newsletter or a contest, note that this
                  doesn't automatically create a marketplace account. If
                  problems persist, use the password reset option or contact
                  support.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Will other people see my email address when they view my
                  listing?
                </h4>
                <p className="text-muted-foreground text-sm">
                  No, your email address is never shared with other users. All
                  communications go through our secure messaging system to
                  protect your privacy.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Will other people see my home address when they view my
                  listing?
                </h4>
                <p className="text-muted-foreground text-sm">
                  No, your home address is never shared with other users. When
                  people view your listing, they only see your general area
                  based on your postal code for basic directional information.
                  You can even use just the first 3 characters of your postal
                  code to make the location even more general.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Why am I not getting emails from GunEx?
                </h4>
                <p className="text-muted-foreground text-sm">
                  If you're not receiving emails from GunEx (account setup,
                  password reset, ad notifications, or inquiries), check your
                  spam/junk folder first. Add @gunex.ca to your email whitelist
                  to ensure future emails reach your inbox. If problems persist,
                  contact support with your email address.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Buying & Selling */}
          <Card id="buying-selling">
            <CardHeader>
              <CardTitle>Buying & Selling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I create a listing?
                </h4>
                <p className="text-muted-foreground text-sm">
                  After signing in, click "Post" in the navigation bar. Complete
                  the listing form with accurate details, upload clear photos,
                  and set your asking price. Review our{" "}
                  <a href="/community" className="text-primary hover:underline">
                    listing guidelines
                  </a>{" "}
                  to ensure compliance.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  What information must be included in a listing?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Firearm listings must include make, model, serial number
                  (partially obscured in public view), caliber, condition, clear
                  photos, asking price, and general location. All information
                  must be accurate and honest.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I contact a seller?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Use the "Message" button on any listing to contact the seller
                  through our secure messaging system. Keep initial
                  communications on platform for safety and record-keeping
                  purposes.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">How do payments work?</h4>
                <p className="text-muted-foreground text-sm">
                  GunEx facilitates connections between buyers and sellers but
                  doesn't process payments directly. Users arrange payment
                  methods privately. We recommend secure methods like certified
                  cheques, bank drafts, or cash for in-person transactions.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Can I negotiate prices with sellers?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Yes, many listings allow price negotiation. Contact the seller
                  through our messaging system to discuss pricing. Be respectful
                  and reasonable in your offers.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I arrange to meet a buyer/seller?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Always meet in safe, public locations such as police station
                  parking lots, gun stores, or shooting ranges. Follow our{" "}
                  <a href="/safety" className="text-primary hover:underline">
                    safety guidelines
                  </a>{" "}
                  for secure transactions.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I renew or refresh my listing?
                </h4>
                <p className="text-muted-foreground text-sm">
                  You can refresh your listing by editing it in your account
                  dashboard. This will move it back to the top of search results
                  as if it were a new posting. Some platforms charge a small fee
                  for this feature to prevent spam and ensure fair visibility
                  for all users.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I leave a review for someone I've dealt with?
                </h4>
                <p className="text-muted-foreground text-sm">
                  You can leave reviews for users you've completed transactions
                  with. Visit their profile page and look for the review section
                  at the bottom. Only leave reviews for actual transactions
                  you've completed, not for deals that fell through during
                  negotiations.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Someone gave me a negative review. Can I have it removed?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Reviews can only be removed if they violate our review policy.
                  Reviews should only be posted by users who actually completed
                  a transaction with you, not from deals that fell through
                  during negotiations. If you believe a review violates our
                  policies, contact support with details about the situation.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I legally sell firearms in Canada?
                </h4>
                <p className="text-muted-foreground text-sm">
                  To legally sell firearms, you must verify the buyer has the
                  appropriate license (PAL for non-restricted, RPAL for
                  restricted). For restricted firearms, you must notify the RCMP
                  of the transfer. Keep records of all transactions. For
                  detailed legal requirements, consult the{" "}
                  <a
                    href="https://www.rcmp-grc.gc.ca/en/firearms"
                    className="text-primary hover:underline"
                  >
                    RCMP Canadian Firearms Program
                  </a>{" "}
                  or call 1-800-731-4000.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Legal Compliance */}
          <Card id="legal-compliance">
            <CardHeader>
              <CardTitle>Legal Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  What licenses do I need to buy firearms?
                </h4>
                <p className="text-muted-foreground text-sm">
                  You need a valid PAL (Possession and Acquisition License) for
                  non-restricted firearms, or RPAL (Restricted PAL) for
                  restricted firearms. Both buyer and seller must have
                  appropriate licenses for the type of firearm being
                  transferred.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I verify someone's license?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Always verify the other party's license before completing any
                  transaction. Check that the license is current, matches their
                  identification, and covers the type of firearm being
                  transferred. When in doubt, contact the RCMP Canadian Firearms
                  Program.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  What paperwork is required for transfers?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Non-restricted firearms require basic transfer documentation.
                  Restricted firearms require notification to the RCMP and may
                  require additional paperwork. Both parties should maintain
                  records of the transaction including license verification.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Can I ship firearms to buyers?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Firearms shipping has specific legal requirements and
                  restrictions. Contact Canada Post or licensed shipping
                  companies for current regulations. Many users prefer in-person
                  transfers to ensure proper verification and compliance.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  What if I suspect illegal activity?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Report suspected illegal activity immediately to local law
                  enforcement (911) and notify us at safety@gunex.ca. We
                  cooperate fully with law enforcement investigations and
                  maintain zero tolerance for illegal activity.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How can I validate someone's PAL/RPAL?
                </h4>
                <p className="text-muted-foreground text-sm">
                  For restricted firearm sales, the buyer should provide their
                  name as it appears on the RPAL card, the RPAL number, and
                  expiry date. The seller then calls the RCMP Canadian Firearms
                  Program at 1-800-731-4000 to get a reference number for the
                  transfer. The CFP agent will verify the buyer's license during
                  this call.
                  <strong>
                    {" "}
                    We don't recommend sending photos of licenses
                  </strong>{" "}
                  as the official verification process provides proper
                  authentication.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I ship firearms legally in Canada?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Firearms shipping has strict requirements. Canada Post has
                  specific rules for firearm shipping - check their{" "}
                  <a
                    href="https://www.canadapost-postescanada.ca/cpc/en/personal/sending/parcels/restrictions/firearms.page"
                    className="text-primary hover:underline"
                  >
                    firearms shipping guidelines
                  </a>
                  . Restricted firearms have additional requirements and may
                  require authorized carriers. Many users prefer in-person
                  transfers to ensure proper verification and avoid shipping
                  complexities.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I stay updated on Canadian firearms law changes?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Canadian firearms laws can change, including Order-in-Council
                  classifications and new regulations. Stay informed by
                  monitoring the{" "}
                  <a
                    href="https://www.rcmp-grc.gc.ca/en/firearms"
                    className="text-primary hover:underline"
                  >
                    RCMP Canadian Firearms Program
                  </a>
                  , Justice Canada announcements, and reputable firearms
                  organizations. GunEx will notify users of significant changes
                  that affect platform usage, but users are responsible for
                  ensuring their firearms remain legally compliant.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Safety & Security */}
          <Card id="safety-security">
            <CardHeader>
              <CardTitle>Safety & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I stay safe when meeting buyers/sellers?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Always meet in public, well-lit locations. Bring a friend if
                  possible, tell someone where you're going, and trust your
                  instincts. Follow all firearms safety rules during
                  inspections. See our{" "}
                  <a href="/safety" className="text-primary hover:underline">
                    comprehensive safety guide
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  What are the red flags I should watch for?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Be cautious of prices significantly below market value,
                  requests for immediate payment, reluctance to meet in person,
                  poor quality photos, pressure for quick decisions, and
                  requests for unusual payment methods.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I report suspicious users or listings?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Use the "Report" button on any listing or user profile to
                  report violations. For urgent safety concerns, contact us
                  immediately at safety@gunex.ca or report to local law
                  enforcement.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How is my personal information protected?
                </h4>
                <p className="text-muted-foreground text-sm">
                  We use industry-standard encryption and security measures to
                  protect your information. We never sell your data and only
                  share information as required by law. Read our{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    privacy policy
                  </a>{" "}
                  for complete details.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  What should I do if my account is compromised?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Immediately change your password, enable two-factor
                  authentication, and contact our support team. Review your
                  account activity and report any unauthorized actions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Support */}
          <Card id="technical-support">
            <CardHeader>
              <CardTitle>Technical Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I edit or delete my listing?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Go to your profile and select "My Listings" to manage your
                  active listings. You can edit details, update photos, change
                  prices, or mark items as sold or remove them entirely.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Why can't I upload photos to my listing?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Ensure your photos are in supported formats (JPG, PNG) and
                  under the size limit (typically 10MB per image). Check your
                  internet connection and try again. Contact support if problems
                  persist.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I use the FRT lookup tool?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Visit our{" "}
                  <a href="/frt" className="text-primary hover:underline">
                    FRT lookup page
                  </a>{" "}
                  and search by FRN number, manufacturer, model, or other
                  criteria. This tool helps verify firearm classifications and
                  legal status according to the RCMP Firearms Reference Table.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  The website is running slowly. What can I do?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Try refreshing your browser, clearing your cache and cookies,
                  or using a different browser. Check your internet connection
                  and try accessing the site from a different device. Contact
                  support if issues persist.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I deactivate or delete my account?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Account deactivation options are available in your account
                  settings. Before deactivating, ensure you've completed any
                  pending transactions and downloaded any important information.
                  Contact support if you need assistance.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  I'm having trouble posting a listing
                </h4>
                <p className="text-muted-foreground text-sm">
                  If you're getting error messages when posting a listing, first
                  try clearing your browser's cache and cookies. Ensure all
                  required fields are filled out completely and accurately.
                  Check that your photos are in supported formats (JPG, PNG) and
                  under the size limit. If problems persist, contact support
                  with details about the error messages you're seeing.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  Why is my account blocked or suspended?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Accounts may be blocked for suspicious activity, terms of
                  service violations, problematic listings, or user reports. We
                  err on the side of caution to protect our community. If your
                  account is blocked, contact support for clarification and to
                  resolve the issue. Most blocks can be resolved once the
                  situation is clarified.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  I paid for a featured listing. Why isn't it showing at the
                  top?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Featured listings compete for limited top spots. When multiple
                  users have featured ads, the system rotates which ones are
                  displayed to ensure fairness. Your listing will appear at the
                  top periodically, and more frequently as searches become more
                  specific to your item and location.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">
                  How do I clear my browser's cache?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Browser cache clearing varies by browser. Generally: Press
                  Ctrl+Shift+Delete (PC) or Cmd+Shift+Delete (Mac), select
                  "Cached images and files" and click Clear/Delete. In Chrome:
                  Settings {"> "}Privacy {"> "}Clear browsing data. In Firefox:
                  History {"> "}Clear Recent History. This often resolves
                  posting and login issues.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Still Need Help */}
          <Card>
            <CardHeader>
              <CardTitle>Still Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                If you can't find the answer you're looking for, we're here to
                help. Our support team is knowledgeable about Canadian firearms
                laws, platform features, and technical issues.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950/20">
                  <h4 className="font-semibold text-blue-800 text-sm dark:text-blue-200">
                    Contact Support
                  </h4>
                  <p className="mt-1 text-blue-700 text-sm dark:text-blue-300">
                    Use our{" "}
                    <a href="/contact" className="underline hover:no-underline">
                      contact form
                    </a>{" "}
                    or email hello@gunex.ca for general questions and technical
                    support.
                  </p>
                </div>
                <div className="rounded-md bg-green-50 p-4 dark:bg-green-950/20">
                  <h4 className="font-semibold text-green-800 text-sm dark:text-green-200">
                    Community Guidelines
                  </h4>
                  <p className="mt-1 text-green-700 text-sm dark:text-green-300">
                    Review our{" "}
                    <a
                      href="/community"
                      className="underline hover:no-underline"
                    >
                      community guidelines
                    </a>{" "}
                    for platform rules, best practices, and enforcement
                    policies.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  Response times: General inquiries (24 hours) • Technical
                  support (12 hours) • Safety concerns (4 hours)
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
