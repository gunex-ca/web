import type { Metadata } from "next";
import { Favicon } from "~/app/_components/Favicon";
import Navbar from "~/app/_components/Navbar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "About Us • GunEx",
  description:
    "Learn about GunEx, Canada's premier marketplace for buying and selling firearms, accessories, and archery equipment safely and legally.",
  keywords: [
    "about gunex",
    "canadian firearms marketplace",
    "gun trading platform",
    "firearms community canada",
    "safe gun sales",
    "legal firearms trading",
  ],
  openGraph: {
    title: "About Us • GunEx",
    description:
      "Learn about GunEx, Canada's premier marketplace for buying and selling firearms, accessories, and archery equipment safely and legally.",
    url: "/about",
    siteName: "GunEx",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Us • GunEx",
    description:
      "Learn about GunEx, Canada's premier marketplace for buying and selling firearms, accessories, and archery equipment safely and legally.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <div className="mx-auto flex items-center justify-center gap-3">
              <Favicon className="size-12 fill-black dark:fill-white" />
              <h1 className="font-bold text-4xl">About GunEx</h1>
            </div>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Canada's trusted marketplace for firearms enthusiasts to buy,
              sell, and connect safely and legally.
            </p>
          </div>

          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Our Mission
                <Badge
                  variant="secondary"
                  className="bg-red-500/10 text-red-600 dark:text-red-400"
                >
                  Made in Canada 🇨🇦
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GunEx was created to provide Canadian firearms enthusiasts with
                a safe, legal, and user-friendly platform to buy and sell
                firearms, accessories, and archery equipment. We believe that
                responsible gun ownership and trading should be accessible to
                all licensed Canadians.
              </p>
              <p>
                Our platform bridges the gap between traditional gun stores and
                private sales, creating a trusted community where buyers and
                sellers can connect with confidence, knowing that all
                transactions comply with Canadian firearms regulations.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Every feature we build prioritizes the safety of our users and
                  the broader community. We provide tools and guidelines to
                  ensure all transactions meet the highest safety standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legal Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  We strictly adhere to all Canadian firearms laws and
                  regulations. Our platform is designed to facilitate only legal
                  transactions between properly licensed individuals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Trust is the foundation of our marketplace. We implement
                  verification systems, user reviews, and transparent
                  communication tools to build lasting trust within our
                  community.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  We continuously improve our platform with modern technology,
                  user feedback, and industry best practices to provide the best
                  possible experience for Canadian firearms enthusiasts.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Platform Features */}
          <Card>
            <CardHeader>
              <CardTitle>What Makes GunEx Different</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">
                      Comprehensive FRT Integration
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Access the complete RCMP Firearms Reference Table to
                      verify firearm classifications and legal status instantly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      License Verification
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Ensure all users possess valid PAL/RPAL licenses before
                      engaging in transactions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      Smart Categorization
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Easily browse firearms, accessories, and archery equipment
                      with our intelligent categorization system.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">Secure Messaging</h4>
                    <p className="text-muted-foreground text-sm">
                      Communicate safely with other users through our built-in
                      messaging system that protects your privacy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      Location-Based Search
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Find listings near you with our postal code-based search
                      system, making local transactions easier.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Mobile Optimized</h4>
                    <p className="text-muted-foreground text-sm">
                      Access GunEx from any device with our responsive design
                      that works perfectly on desktop, tablet, and mobile.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>By the Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className="font-bold text-3xl text-primary">50K+</div>
                  <div className="text-muted-foreground text-sm">
                    Active Listings
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-3xl text-primary">15K+</div>
                  <div className="text-muted-foreground text-sm">
                    Verified Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-3xl text-primary">100K+</div>
                  <div className="text-muted-foreground text-sm">
                    Successful Transactions
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-3xl text-primary">99.8%</div>
                  <div className="text-muted-foreground text-sm">
                    User Satisfaction
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canadian Focus */}
          <Card>
            <CardHeader>
              <CardTitle>Built for Canada</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                GunEx is proudly Canadian-built and operated. We understand the
                unique challenges and regulations that Canadian firearms
                enthusiasts face, and our platform is specifically designed to
                address these needs.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-sm">
                    Canadian Law Compliance
                  </h4>
                  <ul className="ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• Federal firearms regulations</li>
                    <li>• Provincial restrictions and requirements</li>
                    <li>• Municipal bylaws and regulations</li>
                    <li>• Transportation and storage laws</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Coast to Coast</h4>
                  <ul className="ml-4 space-y-1 text-muted-foreground text-sm">
                    <li>• All provinces and territories supported</li>
                    <li>• Local dealers and retailers featured</li>
                    <li>• Regional firearms communities connected</li>
                    <li>• Bilingual support (English/French)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                We love hearing from our community. Whether you have questions,
                feedback, or suggestions for improvement, we're here to listen.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-sm">General Inquiries</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Email: hello@gunex.ca</li>
                    <li>
                      • Contact form:{" "}
                      <a
                        href="/contact"
                        className="text-primary hover:underline"
                      >
                        Contact page
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Support</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Technical support: support@gunex.ca</li>
                    <li>• Safety concerns: safety@gunex.ca</li>
                    <li>
                      • Help center:{" "}
                      <a
                        href="/transaction-safety"
                        className="text-primary hover:underline"
                      >
                        Transaction Safety
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Vision */}
          <Card>
            <CardHeader>
              <CardTitle>Looking Forward</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                As Canada's firearms community continues to grow and evolve,
                GunEx is committed to growing alongside it. We're constantly
                working on new features, partnerships, and innovations to better
                serve Canadian firearms enthusiasts while maintaining our core
                values of safety, legality, and community trust.
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
