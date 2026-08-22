'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { sendOutreachDataEmail } from '@/actions/send-outreach-data-email';
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
  OUTREACH_DATA_EMAIL_MAX_LEN,
  OUTREACH_DATA_LAST4_VIN_LEN,
  OUTREACH_DATA_NAME_MAX_LEN,
  outreachDataEmailFormSchema,
  type OutreachDataEmailFormValues,
} from '@/features/outreach-data-email/schema';

const defaultValues: OutreachDataEmailFormValues = {
  email: '',
  last4VIN: '',
  name: '',
};

export function OutreachDataEmailForm() {
  const [pending, startTransition] = useTransition();
  const form = useForm<OutreachDataEmailFormValues>({
    defaultValues,
    resolver: zodResolver(outreachDataEmailFormSchema),
  });

  function onSubmit(data: OutreachDataEmailFormValues) {
    startTransition(() => {
      void (async () => {
        const result = await sendOutreachDataEmail(data);
        if (!result.ok) {
          toast.error('Could not send', {
            description: result.error,
            position: 'top-center',
          });
          return;
        }
        form.reset(defaultValues);
        toast.success('Email sent', {
          description: 'The outreach data message was delivered.',
          position: 'top-center',
        });
      })();
    });
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Send outreach data email</CardTitle>
        <CardDescription>
          Sends the CARB data review outreach template to a vehicle owner.
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
              placeholder="Name as it should appear in the greeting"
              required
              maxLength={OUTREACH_DATA_NAME_MAX_LEN}
            />
            <InputEmail
              control={form.control}
              label="Recipient email"
              name="email"
              placeholder="name@example.com"
              required
              maxLength={OUTREACH_DATA_EMAIL_MAX_LEN}
            />
            <InputText
              control={form.control}
              label="VIN ending"
              name="last4VIN"
              placeholder="Last 4 VIN characters"
              required
              maxLength={OUTREACH_DATA_LAST4_VIN_LEN}
            />
            <Button disabled={pending} type="submit">
              {pending ? 'Sending...' : 'Send email'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
