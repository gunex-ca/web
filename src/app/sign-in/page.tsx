import Link from "next/link";
import { SignInForm } from "./_components/SignInForm";

export const metadata = {
  title: "Sign in • GunEx",
  description: "Sign in to your GunEx account.",
  alternates: { canonical: "/sign-in" },
} satisfies import("next").Metadata;

export default function SignIn() {
  return (
    <main className="container mx-auto flex min-h-svh flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl">Sign in</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Welcome back. Choose a sign-in method.
          </p>
        </div>

        <SignInForm />

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
