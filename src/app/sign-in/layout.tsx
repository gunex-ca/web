import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in • Gunex",
  description: "Sign in to your Gunex account.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/sign-in" },
  openGraph: {
    title: "Sign in • Gunex",
    description: "Sign in to your Gunex account.",
    url: "/sign-in",
    type: "website",
    siteName: "Gunex",
    images: [
      {
        url: "/og/sign-in.png",
        width: 1200,
        height: 630,
        alt: "Sign in • Gunex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign in • Gunex",
    description: "Sign in to your Gunex account.",
    images: ["/og/sign-in.png"],
  },
};

export default function SignInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
