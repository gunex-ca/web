import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { ThemeProvider } from "next-themes";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "GunEx",
  description:
    "Canada's premier marketplace for buying and selling firearms, accessories, and archery equipment.",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable}`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="a863a8ae-ae21-425b-be3d-48dee015c22f"
        />
      </head>
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <Toaster />
            <div className="mb-28 flex-1">
              <HydrateClient>{children}</HydrateClient>
            </div>
            <Footer />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
