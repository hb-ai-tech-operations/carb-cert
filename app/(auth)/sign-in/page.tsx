import { SignInForm } from '@/features/auth/sign-in-form';

export default function SignInPage() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)_0%,transparent_55%)] opacity-[0.12]"
      />
      <SignInForm />
    </div>
  );
}
