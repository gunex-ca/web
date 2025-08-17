import type { Metadata } from "next";
import { SignInForm } from "./_components/SignInForm";

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
      </div>
    </main>
  );
}
