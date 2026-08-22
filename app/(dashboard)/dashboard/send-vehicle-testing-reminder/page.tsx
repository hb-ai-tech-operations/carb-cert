import { SendVehicleTestingReminderEmailForm } from '@/features/send-vehicle-testing-reminder-page';

export default function DashboardSendVehicleTestingReminderPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Send vehicle testing reminder
        </h1>
        <p className="text-sm text-muted-foreground">
          Internal tool to remind customers that vehicle testing is still
          required. Includes a link to the certified testers directory.
        </p>
      </div>
      <SendVehicleTestingReminderEmailForm />
    </div>
  );
}
