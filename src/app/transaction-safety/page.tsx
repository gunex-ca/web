import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Transaction Safety Guide • Gunex",
  description:
    "Essential safety tips for secure transactions on Gunex. Learn how to protect yourself from scams, verify users, and conduct safe buying and selling on Canada's firearms marketplace.",
  keywords: [
    "online safety",
    "firearms transaction safety",
    "scam prevention",
    "PAL protection",
    "safe transactions",
    "fraud prevention",
    "canadian firearms safety",
    "secure buying selling",
  ],
  openGraph: {
    title: "Transaction Safety Guide • Gunex",
    description:
      "Essential safety tips for secure transactions on Gunex. Learn how to protect yourself from scams, verify users, and conduct safe buying and selling on Canada's firearms marketplace.",
    url: "/transaction-safety",
    siteName: "Gunex",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Transaction Safety Guide • Gunex",
    description:
      "Essential safety tips for secure transactions on Gunex. Learn how to protect yourself from scams, verify users, and conduct safe buying and selling on Canada's firearms marketplace.",
  },
  alternates: {
    canonical: "/transaction-safety",
  },
};

export default function Help() {
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-4xl">Transaction Safety Guide</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Your safety is our priority. Follow these essential guidelines to
              protect yourself from scams and conduct secure transactions on
              Gunex.
            </p>
          </div>

          {/* Quick Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Safety Topics
                <Badge
                  variant="secondary"
                  className="bg-red-500/10 text-red-600 dark:text-red-400"
                >
                  Essential Reading
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                <a
                  href="#face-to-face"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  1. Face-to-Face Transactions
                </a>
                <a
                  href="#online-deals"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  2. Online Transactions
                </a>
                <a
                  href="#pal-protection"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  3. Protecting Your PAL Info
                </a>
                <a
                  href="#reporting"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  4. Reporting Suspicious Users
                </a>
                <a
                  href="#spam-replies"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  5. Avoiding Cheque Scams
                </a>
                <a
                  href="#wanted-ads"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  6. Wanted Ad Safety
                </a>
                <a
                  href="#fake-etransfers"
                  className="rounded-md p-2 text-primary hover:bg-muted hover:underline"
                >
                  7. Fake E-transfer Scams
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Face-to-Face Transactions */}
          <Card id="face-to-face">
            <CardHeader>
              <CardTitle>1. Face-to-Face Transactions (Recommended)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-green-50 p-4 dark:bg-green-950/20">
                <h4 className="font-semibold text-green-800 text-sm dark:text-green-200">
                  Best Practice: Buy in Person with Cash
                </h4>
                <p className="mt-1 text-green-700 text-sm dark:text-green-300">
                  Face-to-face transactions with cash payment are the safest way
                  to avoid fraud and ensure you're satisfied with your purchase.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm">
                    Why Face-to-Face is Safer
                  </h4>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>
                      • <strong>Fraud Prevention:</strong> The RCMP has received
                      many reports of people being defrauded when buying
                      firearms online. Common scams involve fraudulent sellers
                      who take e-transfers but never ship the item.
                    </li>
                    <li>
                      • <strong>Quality Inspection:</strong> You can physically
                      inspect the firearm's condition, bore, crown, action
                      smoothness, and overall quality before agreeing to a
                      price.
                    </li>
                    <li>
                      • <strong>Immediate Resolution:</strong> Any issues can be
                      addressed immediately rather than dealing with shipping
                      problems or disputes later.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">
                    Safe Meeting Locations
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    While many firearms owners safely use their homes as meeting
                    places, consider these alternatives if you prefer public
                    locations:
                  </p>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• Local shooting range parking lots</li>
                    <li>• Gun store parking lots (with permission)</li>
                    <li>• Police station designated safe exchange zones</li>
                    <li>• Crown land or rural areas (use common sense)</li>
                  </ul>
                </div>

                <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-950/20">
                  <h4 className="font-semibold text-sm text-yellow-800 dark:text-yellow-200">
                    Important: Choose Appropriate Locations
                  </h4>
                  <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                    Avoid busy public places like mall parking lots where
                    uninformed citizens might call police, creating unnecessary
                    complications. Choose locations where firearms handling is
                    appropriate and expected.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Online Transactions */}
          <Card id="online-deals">
            <CardHeader>
              <CardTitle>
                2. Online Transactions (When Shipping is Required)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">
                  Verify the Seller First
                </h4>
                <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>• Read the seller's profile information thoroughly</li>
                  <li>• Check reviews from other Gunex members</li>
                  <li>• Look at how long they've been a member</li>
                  <li>
                    • New users without reviews aren't necessarily
                    untrustworthy, but require extra caution
                  </li>
                </ul>
              </div>

              <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950/20">
                <h4 className="font-semibold text-blue-800 text-sm dark:text-blue-200">
                  Recommended: Cash on Delivery (C.O.D.)
                </h4>
                <p className="mt-1 text-blue-700 text-sm dark:text-blue-300">
                  For sellers without established reviews, use Canada Post's{" "}
                  <a
                    href="https://www.canadapost-postescanada.ca/information/app/cod"
                    className="underline hover:no-underline"
                  >
                    C.O.D. service
                  </a>
                  . It costs only $7.25 extra but ensures the item is shipped
                  before you pay.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm">
                  Red Flags to Watch For
                </h4>
                <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>
                    • Firearms improperly classified (e.g., AR-15 listed as
                    non-restricted)
                  </li>
                  <li>
                    • No phone number or phone numbers with wrong area codes
                  </li>
                  <li>
                    • Text-only numbers or numbers going to automated systems
                  </li>
                  <li>• Unusually low prices that seem too good to be true</li>
                  <li>• Map location doesn't match claimed location</li>
                  <li>• Images that appear stolen from other websites</li>
                  <li>• Multiple identical ads in different provinces</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm">
                  Essential Verification Steps
                </h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">
                      1. Phone Verification
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      Refuse to deal with sellers who won't speak on the phone.
                      Overseas scammers typically can't or won't take phone
                      calls.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">
                      2. Video Verification
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      Ask for a live video call via Skype or FaceTime where they
                      show the item. Alternatively, request a 5-10 second video
                      showing the item with a piece of paper containing both
                      your email addresses.{" "}
                      <strong>Never accept photos with notes</strong>- scammers
                      use Photoshop to fake these.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">
                      3. Google Reverse Image Search
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      Check if listing photos appear elsewhere online using
                      Google's reverse image search feature.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PAL Protection */}
          <Card id="pal-protection">
            <CardHeader>
              <CardTitle>3. Protecting Your PAL Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/20">
                <h4 className="font-semibold text-red-800 text-sm dark:text-red-200">
                  Important: Don't Send Photos of Your License
                </h4>
                <p className="mt-1 text-red-700 text-sm dark:text-red-300">
                  Never send photos of your PAL or driver's license unless
                  absolutely necessary and only to sellers with multiple 5-star
                  reviews that you trust completely.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm">
                    For Restricted Firearm Sales
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Buyers only need to provide:
                  </p>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• Name as it appears on the RPAL card</li>
                    <li>• RPAL number</li>
                    <li>• Expiry date</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground text-sm">
                    The seller gets a reference number from the CFP, and the CFP
                    agent verifies your license during the call. Photos are
                    unnecessary and increase identity theft risk.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">
                    For Non-Restricted Firearm Sales (2022 Rule Changes)
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Sellers must obtain a reference number proving they verified
                    the buyer's PAL is valid. The government accepts three
                    methods:
                  </p>
                  <div className="space-y-2">
                    <div className="rounded-md bg-green-50 p-3 dark:bg-green-950/20">
                      <h5 className="font-medium text-green-800 text-sm dark:text-green-200">
                        1. In-Person Transaction (Recommended)
                      </h5>
                      <p className="text-green-700 text-sm dark:text-green-300">
                        Buyer shows PAL card physically to seller - no photos
                        needed.
                      </p>
                    </div>
                    <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/20">
                      <h5 className="font-medium text-blue-800 text-sm dark:text-blue-200">
                        2. Live Video Call (Good Alternative)
                      </h5>
                      <p className="text-blue-700 text-sm dark:text-blue-300">
                        During a live video call, buyer shows PAL card to seller
                        via camera - safer than sending photos.
                      </p>
                    </div>
                    <div className="rounded-md bg-yellow-50 p-3 dark:bg-yellow-950/20">
                      <h5 className="font-medium text-sm text-yellow-800 dark:text-yellow-200">
                        3. Photo Documentation (Higher Risk)
                      </h5>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Photo of PAL card - only use with trusted sellers with
                        excellent reviews. Higher identity theft risk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting */}
          <Card id="reporting">
            <CardHeader>
              <CardTitle>4. Reporting Suspicious Users</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Help protect the Gunex community by reporting suspected scammers
                immediately. Your reports help us maintain a safe platform for
                all users.
              </p>

              <div>
                <h4 className="font-semibold text-sm">How to Report</h4>
                <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>
                    • Use the "Report" button on suspicious listings or profiles
                  </li>
                  <li>• Email safety@gunex.ca with details</li>
                  <li>
                    • Use our{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      contact form
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm">
                  Include This Information
                </h4>
                <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>• Link to the suspicious listing or profile</li>
                  <li>
                    • Detailed description of why you suspect scam activity
                  </li>
                  <li>
                    • Screenshots or copies of communications outside Gunex
                    messaging
                  </li>
                  <li>• Any evidence that supports your suspicions</li>
                </ul>
              </div>

              <p className="text-muted-foreground text-sm">
                Providing evidence helps us verify reports and avoid blocking
                legitimate accounts unnecessarily. We investigate all reports
                thoroughly.
              </p>
            </CardContent>
          </Card>

          {/* Cheque Scams */}
          <Card id="spam-replies">
            <CardHeader>
              <CardTitle>5. Avoiding Fake Cheque Scams</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">How the Scam Works</h4>
                <p className="text-muted-foreground text-sm">
                  Scammers send fake cheques for more than the agreed price,
                  claim it was a "mistake," and ask for the difference back.
                  These counterfeit cheques are sophisticated and often fool
                  bank tellers initially.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm">Two Common Methods</h4>
                <div className="space-y-2">
                  <div>
                    <h5 className="font-medium text-sm">
                      1. Mobile Deposit Scam (Most Common)
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      Scammer sends a photo of a fake cheque for mobile deposit.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">
                      2. Mailed Fake Cheque
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      Less common now, but scammers mail counterfeit cheques.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/20">
                <h4 className="font-semibold text-red-800 text-sm dark:text-red-200">
                  Warning Signs
                </h4>
                <ul className="mt-1 ml-4 space-y-1 text-red-700 text-sm dark:text-red-300">
                  <li>• Cheque amount exceeds agreed price</li>
                  <li>• Buyer claims overpayment was a "mistake"</li>
                  <li>• Request to "send back the difference"</li>
                  <li>• Unusual payment method for firearms transactions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm">Protection Steps</h4>
                <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>
                    • Never accept cheque payments for amounts over the agreed
                    price
                  </li>
                  <li>
                    • Don't send items before payment fully clears (can take
                    weeks)
                  </li>
                  <li>• Report suspicious payment attempts immediately</li>
                  <li>
                    • Stick to cash, certified cheques, or established
                    e-transfer from verified buyers
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Wanted Ads */}
          <Card id="wanted-ads">
            <CardHeader>
              <CardTitle>6. Safety for Wanted Ad Posters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Wanted ads attract scammers because they can contact you without
                posting listings that undergo our screening process. Extra
                vigilance is required.
              </p>

              <div>
                <h4 className="font-semibold text-sm">
                  Priority Safety Checks (In Order of Importance)
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-sm">
                      1. Verify They Have an Active Listing
                    </h5>
                    <ul className="mt-1 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>
                        • Check if the seller has the same item posted on Gunex
                      </li>
                      <li>
                        • If contacted through Gunex messaging, click their
                        profile to view listings
                      </li>
                      <li>
                        • If contacted by text/email, ask them to message you
                        through Gunex instead
                      </li>
                      <li>
                        • Cross-reference: message the actual listing owner to
                        confirm identity
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950/20">
                    <h5 className="font-medium text-blue-800 text-sm dark:text-blue-200">
                      Recommendation: Remove Your Phone Number
                    </h5>
                    <p className="text-blue-700 text-sm dark:text-blue-300">
                      Consider removing your phone number from wanted ads. This
                      forces contact through Gunex messaging, revealing account
                      status and review history.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm">
                      2. Google Reverse Image Search
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      Almost all wanted ad scams use stolen images from the
                      internet. Check any photos they send using Google's
                      reverse image search.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm">
                      3. Test Phone Numbers
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      If contacted by text, call the number. Scammers often use
                      text-only apps that can't receive calls, or the call
                      quality is poor because it's internet-based rather than a
                      real phone.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm">
                      4. Apply Standard Online Safety Tips
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      Check profile reviews, meet in person if local, request
                      C.O.D. shipping, and ask for verification video as
                      described in the online deals section above.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fake E-transfers */}
          <Card id="fake-etransfers">
            <CardHeader>
              <CardTitle>7. Fake E-transfer and Account Hijacking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/20">
                <h4 className="font-semibold text-red-800 text-sm dark:text-red-200">
                  Critical Warning: Phishing Links
                </h4>
                <p className="mt-1 text-red-700 text-sm dark:text-red-300">
                  Scammers send fake e-transfer emails with malicious links that
                  steal your banking credentials and email passwords. Even
                  clicking the link without entering information can compromise
                  your accounts.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm">How the Scam Works</h4>
                <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>
                    • Fake buyer sends email that looks like an e-transfer
                  </li>
                  <li>• Link takes you to fake banking website</li>
                  <li>• Site captures your login credentials</li>
                  <li>
                    • Scammers gain access to your email and financial accounts
                  </li>
                  <li>• May happen even if you don't enter any information</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm">Protection Strategies</h4>
                <div className="space-y-3">
                  <div className="rounded-md bg-green-50 p-3 dark:bg-green-950/20">
                    <h5 className="font-medium text-green-800 text-sm dark:text-green-200">
                      Set Up Auto-Deposit
                    </h5>
                    <p className="text-green-700 text-sm dark:text-green-300">
                      Enable auto-deposit with your bank so legitimate
                      e-transfers go directly to your account without requiring
                      clicks. This makes fake e-transfers obvious when they ask
                      you to "accept" the transfer.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">
                      Verify Website Authenticity
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      If you click an e-transfer link and land on a login page
                      that doesn't match your bank's normal website, stop
                      immediately. Report the attempted scam to us with the
                      username and email address involved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-950/20">
                <h4 className="font-semibold text-sm text-yellow-800 dark:text-yellow-200">
                  Final Reminder: Protect Your PAL
                </h4>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  Do NOT send photos of your PAL to anyone. Only provide the
                  information on the PAL and let the other person call the CFP
                  to verify legitimacy. This protects you from identity theft
                  and illegal use of your credentials.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help or Want to Report a Scam?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/20">
                  <h4 className="font-semibold text-red-800 text-sm dark:text-red-200">
                    Immediate Safety Concerns
                  </h4>
                  <p className="mt-1 text-red-700 text-sm dark:text-red-300">
                    Contact local law enforcement (911) immediately for threats,
                    illegal activity, or immediate danger situations.
                  </p>
                </div>
                <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950/20">
                  <h4 className="font-semibold text-blue-800 text-sm dark:text-blue-200">
                    Platform Safety Issues
                  </h4>
                  <p className="mt-1 text-blue-700 text-sm dark:text-blue-300">
                    Email safety@gunex.ca or use our{" "}
                    <a href="/contact" className="underline hover:no-underline">
                      contact form
                    </a>{" "}
                    for scam reports, suspicious users, or safety questions.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  Remember: If something seems too good to be true, it probably
                  is. Trust your instincts and prioritize your safety over any
                  deal.
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
