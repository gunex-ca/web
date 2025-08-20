import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in • GunEx",
  description: "Sign in to your GunEx account.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/sign-in" },
  openGraph: {
    title: "Sign in • GunEx",
    description: "Sign in to your GunEx account.",
    url: "/sign-in",
    type: "website",
    siteName: "GunEx",
    images: [
      {
        url: "/og/sign-in.png",
        width: 1200,
        height: 630,
        alt: "Sign in • GunEx",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign in • GunEx",
    description: "Sign in to your GunEx account.",
    images: ["/og/sign-in.png"],
  },
};

export default function SignInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
