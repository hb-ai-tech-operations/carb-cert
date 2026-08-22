import { SendCtcPendingFollowupEmailForm } from '@/features/send-ctc-pending-followup-page';

export default function DashboardSendCtcPendingFollowupPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Send CTC pending follow-up
        </h1>
        <p className="text-sm text-muted-foreground">
          Internal tool to email recipients when CTC compliance may still be
          pending. Recipients can manage preferences from the message footer.
        </p>
      </div>
      <SendCtcPendingFollowupEmailForm />
    </div>
  );
}
