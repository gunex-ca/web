import type { Metadata } from "next";
import { SignUpForm } from "./_components/SignUpForm";

export const metadata: Metadata = {
  title: "Create your account • GunEx",
  description: "Sign up for a GunEx account.",
  alternates: { canonical: "/sign-up" },
  openGraph: {
    title: "Create your account • GunEx",
    description: "Sign up for a GunEx account.",
    url: "/sign-up",
    type: "website",
    siteName: "GunEx",
  },
};

export default function SignUp() {
  return (
    <main className="container mx-auto flex min-h-svh flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl">Create your account</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Enter your details to get started.
          </p>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
