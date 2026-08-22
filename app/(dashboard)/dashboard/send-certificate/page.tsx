import { SendCertificateForm } from '@/features/send-certificate';

export default function SendCertificatePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Send certificate</h1>
        <p className="text-sm text-muted-foreground">
          Internal tool to send the certificate notification email with an uploaded
          certificate attached.
        </p>
      </div>
      <SendCertificateForm />
    </div>
  );
}
