import { AccountCreatedEmailForm } from '@/features/account-created-email';

export default function SendAccountCreatedEmailPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Account-created email
        </h1>
        <p className="text-sm text-muted-foreground">
          Internal tool to send the confirmation that a Clean Truck Check account
          exists, including Entity ID, VIN, recommended testing, and a link to
          find CARB credentialed testers.
        </p>
      </div>
      <AccountCreatedEmailForm />
    </div>
  );
}
