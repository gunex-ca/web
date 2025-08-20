import type { Metadata } from "next";
import Navbar from "~/app/_components/Navbar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Accessibility • GunEx",
  description:
    "Learn about GunEx's commitment to accessibility and how we ensure our platform is usable by everyone.",
  keywords: [
    "accessibility",
    "WCAG",
    "web standards",
    "inclusive design",
    "disability support",
    "screen readers",
    "keyboard navigation",
  ],
  openGraph: {
    title: "Accessibility • GunEx",
    description:
      "Learn about GunEx's commitment to accessibility and how we ensure our platform is usable by everyone.",
    url: "/accessibility",
    siteName: "GunEx",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Accessibility • GunEx",
    description:
      "Learn about GunEx's commitment to accessibility and how we ensure our platform is usable by everyone.",
  },
  alternates: {
    canonical: "/accessibility",
  },
};

export default function Accessibility() {
  return (
    <>
      <Navbar showBorder={true} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-4xl">Accessibility</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We're committed to making GunEx accessible to everyone. Learn
              about our accessibility features and how to get the best
              experience on our platform.
            </p>
          </div>

          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Our Commitment
                <Badge
                  variant="secondary"
                  className="bg-green-500/10 text-green-600 dark:text-green-400"
                >
                  WCAG 2.1 AA
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GunEx is designed to be accessible to users with disabilities.
                We follow the Web Content Accessibility Guidelines (WCAG) 2.1
                Level AA standards and continuously work to improve the
                accessibility of our platform.
              </p>
              <p>
                We believe that everyone should have equal access to buying and
                selling firearms, accessories, and archery equipment in Canada,
                regardless of their abilities.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Keyboard Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Navigate using Tab and Shift+Tab</li>
                  <li>• Access all interactive elements</li>
                  <li>• Clear focus indicators</li>
                  <li>• Skip navigation links</li>
                  <li>• Logical tab order</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Screen Reader Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Semantic HTML markup</li>
                  <li>• Descriptive alt text for images</li>
                  <li>• ARIA labels and landmarks</li>
                  <li>• Proper heading hierarchy</li>
                  <li>• Form labels and instructions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visual Design</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• High contrast color scheme</li>
                  <li>• Scalable text up to 200%</li>
                  <li>• Dark and light theme options</li>
                  <li>• Clear visual hierarchy</li>
                  <li>• Readable fonts and spacing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Motor Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Large click targets (44px minimum)</li>
                  <li>• Generous spacing between elements</li>
                  <li>• Drag and drop alternatives</li>
                  <li>• No time-sensitive interactions</li>
                  <li>• Error prevention and correction</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Browser Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Supported Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm">Screen Readers</h4>
                  <p className="text-muted-foreground text-sm">
                    NVDA, JAWS, VoiceOver, TalkBack, and other modern screen
                    readers
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Browsers</h4>
                  <p className="text-muted-foreground text-sm">
                    Chrome, Firefox, Safari, and Edge (latest versions)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Operating Systems</h4>
                  <p className="text-muted-foreground text-sm">
                    Windows, macOS, iOS, and Android
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keyboard Shortcuts */}
          <Card>
            <CardHeader>
              <CardTitle>Keyboard Shortcuts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Skip to main content</span>
                    <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">
                      Tab
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Navigate forward</span>
                    <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">
                      Tab
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Navigate backward</span>
                    <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">
                      Shift + Tab
                    </kbd>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Activate element</span>
                    <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">
                      Enter / Space
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Close dialog</span>
                    <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">
                      Escape
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Search listings</span>
                    <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">
                      Ctrl + K
                    </kbd>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help or Have Feedback?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We're always working to improve accessibility. If you encounter
                any barriers or have suggestions, please let us know.
              </p>
              <div className="space-y-2">
                <p className="font-medium text-sm">Contact us:</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Email: accessibility@gunex.ca</li>
                  <li>
                    • Online form:{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      Contact page
                    </a>
                  </li>
                </ul>
              </div>
              <p className="text-muted-foreground text-sm">
                We aim to respond to accessibility inquiries within 2 business
                days.
              </p>
            </CardContent>
          </Card>

          {/* Third Party Content */}
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Some content on GunEx comes from third parties (like
                user-generated listings and images). While we encourage
                accessible practices, we may not have full control over the
                accessibility of this content. If you encounter inaccessible
                third-party content, please contact us and we'll work with the
                content owner to address the issue.
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
