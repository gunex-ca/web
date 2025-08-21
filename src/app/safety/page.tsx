import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Firearms Safety • GunEx",
  description:
    "Learn essential firearms safety guidelines including the four fundamental rules, safe storage, transportation, and handling practices for Canadian gun owners.",
  keywords: [
    "firearms safety",
    "gun safety",
    "safe transactions",
    "meeting safety",
    "canadian firearms safety",
    "safe handling",
    "security guidelines",
  ],
  openGraph: {
    title: "Firearms Safety • GunEx",
    description:
      "Learn essential firearms safety guidelines including the four fundamental rules, safe storage, transportation, and handling practices for Canadian gun owners.",
    url: "/safety",
    siteName: "GunEx",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Firearms Safety • GunEx",
    description:
      "Learn essential firearms safety guidelines including the four fundamental rules, safe storage, transportation, and handling practices for Canadian gun owners.",
  },
  alternates: {
    canonical: "/safety",
  },
};

export default function Safety() {
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-4xl">Firearms Safety</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Firearms safety is paramount. Follow these guidelines to ensure
              safe handling, storage, transportation, and responsible firearm
              ownership in Canada.
            </p>
          </div>

          {/* Safety First */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Safety First
                <Badge
                  variant="secondary"
                  className="bg-red-500/10 text-red-600 dark:text-red-400"
                >
                  Critical
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Firearms safety is paramount in everything we do. Whether you're
                an experienced shooter or new to firearms ownership, these
                guidelines will help ensure the safety of yourself, your family,
                and your community.
              </p>
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/20">
                <p className="font-medium text-red-800 text-sm dark:text-red-200">
                  Remember: Firearms are always to be treated as loaded
                </p>
                <p className="mt-1 text-red-700 text-sm dark:text-red-300">
                  Never assume a firearm is unloaded. Always follow proper
                  safety procedures regardless of the firearm's perceived
                  condition.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Firearms Safety Fundamentals */}
          <Card>
            <CardHeader>
              <CardTitle>
                The Four Fundamental Rules of Firearms Safety
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950/20">
                    <h4 className="font-semibold text-blue-800 text-sm dark:text-blue-200">
                      Rule 1: Treat Every Firearm as Loaded
                    </h4>
                    <p className="mt-2 text-blue-700 text-sm dark:text-blue-300">
                      Never assume a firearm is unloaded. Always handle every
                      firearm as if it contains live ammunition, regardless of
                      what you've been told or what you think you know.
                    </p>
                  </div>
                  <div className="rounded-md bg-green-50 p-4 dark:bg-green-950/20">
                    <h4 className="font-semibold text-green-800 text-sm dark:text-green-200">
                      Rule 2: Never Point at Anything You Don't Want to Destroy
                    </h4>
                    <p className="mt-2 text-green-700 text-sm dark:text-green-300">
                      Always keep the muzzle pointed in a safe direction. Be
                      aware of what is in front of, behind, and beyond your
                      target.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-950/20">
                    <h4 className="font-semibold text-sm text-yellow-800 dark:text-yellow-200">
                      Rule 3: Keep Your Finger Off the Trigger
                    </h4>
                    <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                      Keep your finger outside the trigger guard until you are
                      ready to shoot. Only place your finger on the trigger when
                      you intend to fire.
                    </p>
                  </div>
                  <div className="rounded-md bg-purple-50 p-4 dark:bg-purple-950/20">
                    <h4 className="font-semibold text-purple-800 text-sm dark:text-purple-200">
                      Rule 4: Be Sure of Your Target and Beyond
                    </h4>
                    <p className="mt-2 text-purple-700 text-sm dark:text-purple-300">
                      Identify your target completely and be aware of what is
                      behind it. Never shoot at sounds, movements, or
                      unidentified objects.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Storage and Transportation */}
          <Card>
            <CardHeader>
              <CardTitle>Safe Storage and Transportation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">
                      Legal Storage Requirements
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>
                        • Non-restricted: Unloaded, with locking device or
                        locked container
                      </li>
                      <li>
                        • Restricted: Unloaded, with locking device, in locked
                        container or room
                      </li>
                      <li>
                        • Ammunition stored separately or in locked container
                      </li>
                      <li>
                        • Trigger locks, cable locks, or gun safes recommended
                      </li>
                      <li>
                        • Follow provincial and municipal storage requirements
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Best Practices</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Invest in a quality gun safe or cabinet</li>
                      <li>• Use multiple locking devices when possible</li>
                      <li>
                        • Store firearms and ammunition in different locations
                      </li>
                      <li>• Keep storage keys secure and away from children</li>
                      <li>• Regularly inspect locking devices for wear</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">
                      Transportation Safety
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Firearms must be unloaded during transport</li>
                      <li>• Use proper carrying cases or containers</li>
                      <li>
                        • Non-restricted: Case not required but recommended
                      </li>
                      <li>• Restricted: Must be in locked, opaque case</li>
                      <li>• Take most direct route to destination</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Vehicle Security</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Never leave firearms visible in vehicles</li>
                      <li>• Lock firearms in trunk or cargo area</li>
                      <li>• Remove firearms from vehicle when possible</li>
                      <li>• Don't advertise firearm ownership with stickers</li>
                      <li>• Report theft to police immediately</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Safety */}
          <Card>
            <CardHeader>
              <CardTitle>Safe Transaction Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">Before Meeting</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Verify the other party's PAL/RPAL credentials</li>
                      <li>
                        • Research the firearm model and fair market value
                      </li>
                      <li>• Arrange to meet in a public, well-lit location</li>
                      <li>
                        • Tell someone where you're going and when you'll return
                      </li>
                      <li>
                        • Bring a knowledgeable friend if you're inexperienced
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">During Inspection</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Always assume the firearm is loaded</li>
                      <li>• Point muzzle in safe direction at all times</li>
                      <li>• Check the action is open and chamber is empty</li>
                      <li>• Inspect serial numbers match documentation</li>
                      <li>
                        • Look for signs of damage, wear, or modifications
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">
                      Safe Meeting Locations
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Police station parking lots (often designated)</li>
                      <li>• Legitimate gun stores with permission</li>
                      <li>• Shooting ranges during business hours</li>
                      <li>• Public parking lots with security cameras</li>
                      <li>• Avoid private residences for initial meetings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Payment Security</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Avoid carrying large amounts of cash</li>
                      <li>• Consider certified cheques or bank drafts</li>
                      <li>• Verify funds before completing transfer</li>
                      <li>• Get proper receipts and documentation</li>
                      <li>
                        • Be cautious of prices that seem too good to be true
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Verification */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Verification and Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-950/20">
                <h4 className="font-semibold text-sm text-yellow-800 dark:text-yellow-200">
                  License Verification is Mandatory
                </h4>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  Always verify that the other party has the appropriate license
                  (PAL for non-restricted, RPAL for restricted firearms) before
                  proceeding with any transaction.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-sm">
                    Seller Responsibilities
                  </h4>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• Verify buyer's license before transfer</li>
                    <li>• Ensure firearm is legal for civilian ownership</li>
                    <li>• Complete required transfer documentation</li>
                    <li>• For restricted firearms, notify RCMP of transfer</li>
                    <li>• Keep records of the transaction</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">
                    Buyer Responsibilities
                  </h4>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• Ensure you have the appropriate license</li>
                    <li>• Verify the firearm's legal classification</li>
                    <li>• Understand transport and storage requirements</li>
                    <li>• Register restricted firearms within 30 days</li>
                    <li>• Follow all applicable laws and regulations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Online Safety */}
          <Card>
            <CardHeader>
              <CardTitle>Online Safety and Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">
                      Protecting Your Information
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Use strong, unique passwords</li>
                      <li>• Enable two-factor authentication</li>
                      <li>• Don't share personal information publicly</li>
                      <li>• Be cautious about revealing your location</li>
                      <li>• Use GunEx's messaging system initially</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      Red Flags to Watch For
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Prices significantly below market value</li>
                      <li>• Requests for immediate payment or shipping</li>
                      <li>• Reluctance to meet in person or talk on phone</li>
                      <li>• Poor quality or stock photos</li>
                      <li>• Pressure to complete transaction quickly</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">
                      Communication Safety
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Keep initial communications on platform</li>
                      <li>• Be professional and respectful</li>
                      <li>• Don't share financial information</li>
                      <li>• Trust your instincts about people</li>
                      <li>• Report suspicious behavior immediately</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      Social Engineering Awareness
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Be skeptical of urgent requests</li>
                      <li>• Verify identity through multiple channels</li>
                      <li>• Don't be pressured into quick decisions</li>
                      <li>• Question requests for unusual payment methods</li>
                      <li>• Report phishing attempts or scams</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Procedures */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Procedures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">Medical Emergency</h4>
                    <p className="text-muted-foreground text-sm">
                      Call 911 immediately for any medical emergency. If
                      firearms-related, inform emergency services that firearms
                      are present at the scene.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      Accidental Discharge
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Ensure everyone is safe and uninjured</li>
                      <li>• Secure the firearm immediately</li>
                      <li>• Check for property damage or injuries</li>
                      <li>• Report to authorities if required by law</li>
                      <li>• Document the incident</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">Theft or Loss</h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Report to local police immediately</li>
                      <li>• Notify RCMP Canadian Firearms Program</li>
                      <li>• Contact your insurance company</li>
                      <li>• Provide serial numbers and descriptions</li>
                      <li>• Keep copies of all reports</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      Suspicious Activity
                    </h4>
                    <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>• Trust your instincts</li>
                      <li>• Leave unsafe situations immediately</li>
                      <li>• Report to local law enforcement</li>
                      <li>• Notify GunEx platform administrators</li>
                      <li>• Document details while fresh</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting Safety Concerns */}
          <Card>
            <CardHeader>
              <CardTitle>Reporting Safety Concerns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                If you encounter safety concerns, suspicious activity, or
                violations of our safety guidelines, please report them
                immediately.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/20">
                  <h4 className="font-semibold text-red-800 text-sm dark:text-red-200">
                    Immediate Danger or Emergency
                  </h4>
                  <p className="mt-1 text-red-700 text-sm dark:text-red-300">
                    Call 911 immediately if there is immediate danger, threat of
                    violence, or suspected illegal activity.
                  </p>
                </div>
                <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950/20">
                  <h4 className="font-semibold text-blue-800 text-sm dark:text-blue-200">
                    Platform Safety Issues
                  </h4>
                  <p className="mt-1 text-blue-700 text-sm dark:text-blue-300">
                    Email safety@gunex.ca for platform-related safety concerns,
                    suspicious listings, or user behavior issues.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">Other Reporting Options:</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Use the "Report" button on listings or profiles</li>
                  <li>
                    • Contact us through our{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      contact form
                    </a>
                  </li>
                  <li>
                    • Report to RCMP Canadian Firearms Program: 1-800-731-4000
                  </li>
                  <li>• Crime Stoppers: 1-800-222-TIPS (8477)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Safety Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-sm">
                    Government Resources
                  </h4>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>
                      •{" "}
                      <a
                        href="https://www.rcmp-grc.gc.ca/en/firearms"
                        className="text-primary hover:underline"
                      >
                        RCMP Canadian Firearms Program
                      </a>
                    </li>
                    <li>
                      •{" "}
                      <a
                        href="https://laws-lois.justice.gc.ca/"
                        className="text-primary hover:underline"
                      >
                        Justice Canada - Firearms Act
                      </a>
                    </li>
                    <li>• Provincial Chief Firearms Offices</li>
                    <li>• Local law enforcement agencies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">
                    Safety Organizations
                  </h4>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• Canadian Shooting Sports Association</li>
                    <li>• National Firearms Association</li>
                    <li>• Provincial shooting organizations</li>
                    <li>• Local gun clubs and ranges</li>
                  </ul>
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
