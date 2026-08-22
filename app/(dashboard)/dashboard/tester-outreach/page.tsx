import { TesterOutreachForm } from '@/features/tester-outreach';

export default function TesterOutreachPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Tester outreach
        </h1>
        <p className="text-sm text-muted-foreground">
          Internal tool to email certified testers about receiving leads from
          Carb Cert customers who need emissions testing.
        </p>
      </div>
      <TesterOutreachForm />
    </div>
  );
}
