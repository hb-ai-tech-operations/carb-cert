import { OutreachDataEmailForm } from '@/features/outreach-data-email';

export default function OutreachDataPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Outreach data email
        </h1>
        <p className="text-sm text-muted-foreground">
          Internal tool to send the CARB data review outreach message with the
          vehicle&apos;s VIN ending.
        </p>
      </div>
      <OutreachDataEmailForm />
    </div>
  );
}
