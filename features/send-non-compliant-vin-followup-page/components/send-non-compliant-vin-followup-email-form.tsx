'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { submitSendNonCompliantVinFollowupEmail } from '@/actions/send-non-compliant-vin-followup-page';
import { InputEmail, InputText } from '@/components/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  SEND_NON_COMPLIANT_FOLLOWUP_EMAIL_MAX_LEN,
  SEND_NON_COMPLIANT_FOLLOWUP_NAME_MAX_LEN,
  sendNonCompliantVinFollowupFormSchema,
  type SendNonCompliantVinFollowupFormValues,
} from '@/features/send-non-compliant-vin-followup-page/schemas/send-non-compliant-vin-followup.schema';

const defaultValues: SendNonCompliantVinFollowupFormValues = {
  email: '',
  name: '',
  vin: '',
};

export const SendNonCompliantVinFollowupEmailForm = () => {
  const [pending, startTransition] = useTransition();
  const form = useForm<SendNonCompliantVinFollowupFormValues>({
    defaultValues,
    resolver: zodResolver(sendNonCompliantVinFollowupFormSchema),
  });

  function onSubmit(data: SendNonCompliantVinFollowupFormValues) {
    startTransition(() => {
      void (async () => {
        const result = await submitSendNonCompliantVinFollowupEmail(data);
        if (!result.ok) {
          toast.error('Could not send', {
            description: result.error,
            position: 'top-center',
          });
          return;
        }
        form.reset(defaultValues);
        toast.success('Email sent', {
          description: 'The non-compliant follow-up was delivered.',
          position: 'top-center',
        });
      })();
    });
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Send non-compliant follow-up</CardTitle>
        <CardDescription>
          Sends the CARB non-compliant VIN notice template. Recipients can manage
          preferences from the message footer.
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
              maxLength={SEND_NON_COMPLIANT_FOLLOWUP_NAME_MAX_LEN}
            />
            <InputEmail
              control={form.control}
              label="Recipient email"
              name="email"
              placeholder="name@example.com"
              required
              maxLength={SEND_NON_COMPLIANT_FOLLOWUP_EMAIL_MAX_LEN}
            />
            <InputText
              control={form.control}
              label="VIN"
              name="vin"
              placeholder="17-character VIN"
              required
              maxLength={17}
            />
            <Button disabled={pending} type="submit">
              {pending ? 'Sending…' : 'Send email'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
