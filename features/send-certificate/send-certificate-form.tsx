'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { sendRegistrationCertificateEmail } from '@/actions/send-registration-certificate-email';
import { InputEmail, InputText } from '@/components/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  SEND_CERTIFICATE_EMAIL_MAX_LEN,
  SEND_CERTIFICATE_NAME_MAX_LEN,
  SEND_CERTIFICATE_VIN_MAX_LEN,
  sendCertificateFormSchema,
  type SendCertificateFormValues,
} from '@/features/send-certificate/schema';

const defaultValues: Omit<SendCertificateFormValues, 'certificate'> & {
  certificate: File | null;
} = {
  email: '',
  name: '',
  vin: '',
  certificate: null,
};

export function SendCertificateForm() {
  const [pending, startTransition] = useTransition();
  const form = useForm<SendCertificateFormValues>({
    defaultValues: defaultValues as SendCertificateFormValues,
    resolver: zodResolver(sendCertificateFormSchema),
  });

  function onSubmit(data: SendCertificateFormValues) {
    startTransition(() => {
      void (async () => {
        const formData = new FormData();
        formData.set('name', data.name);
        formData.set('email', data.email);
        formData.set('vin', data.vin);
        formData.set('certificate', data.certificate);

        const result = await sendRegistrationCertificateEmail(formData);
        if (!result.ok) {
          toast.error('Could not send', {
            description: result.error,
            position: 'top-center',
          });
          return;
        }

        form.reset(defaultValues as SendCertificateFormValues);
        toast.success('Certificate email sent', {
          description: 'The certificate email was delivered with attachment.',
          position: 'top-center',
        });
      })();
    });
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Send certificate</CardTitle>
        <CardDescription>
          Sends the registration certificate email and attaches the uploaded
          certificate file.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputText
              control={form.control}
              label="Recipient name"
              name="name"
              placeholder="Name as it should appear in the email"
              required
              maxLength={SEND_CERTIFICATE_NAME_MAX_LEN}
            />
            <InputEmail
              control={form.control}
              label="Recipient email"
              name="email"
              placeholder="name@example.com"
              required
              maxLength={SEND_CERTIFICATE_EMAIL_MAX_LEN}
            />
            <InputText
              control={form.control}
              label="VIN"
              name="vin"
              placeholder="Vehicle identification number"
              required
              maxLength={SEND_CERTIFICATE_VIN_MAX_LEN}
            />

            <FormField
              control={form.control}
              name="certificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="gap-1 text-base">
                    Certificate file
                    <span className="text-destructive ml-0" aria-label="required">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.webp"
                      onBlur={field.onBlur}
                      onChange={(event) => {
                        const file = event.target.files?.[0] ?? null;
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={pending} type="submit">
              {pending ? 'Sending…' : 'Send certificate'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
