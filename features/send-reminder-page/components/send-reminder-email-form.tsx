'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { submitSendReminderEmail } from '@/actions/send-reminder-page';
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
  SEND_REMINDER_EMAIL_MAX_LEN,
  SEND_REMINDER_NAME_MAX_LEN,
  sendReminderEmailFormSchema,
  type SendReminderEmailFormValues,
} from '@/features/send-reminder-page/schemas/send-reminder.schema';

const defaultValues: SendReminderEmailFormValues = {
  email: '',
  name: '',
};

export const SendReminderEmailForm = () => {
  const [pending, startTransition] = useTransition();
  const form = useForm<SendReminderEmailFormValues>({
    defaultValues,
    resolver: zodResolver(sendReminderEmailFormSchema),
  });

  function onSubmit(data: SendReminderEmailFormValues) {
    startTransition(() => {
      void (async () => {
        const result = await submitSendReminderEmail(data);
        if (!result.ok) {
          toast.error('Could not send', {
            description: result.error,
            position: 'top-center',
          });
          return;
        }
        form.reset(defaultValues);
        toast.success('Reminder sent', {
          description: 'The email was delivered to the recipient.',
          position: 'top-center',
        });
      })();
    });
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Send compliance reminder</CardTitle>
        <CardDescription>
          Sends the standard Clean Truck Check reminder template to the address
          below.
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
              maxLength={SEND_REMINDER_NAME_MAX_LEN}
            />
            <InputEmail
              control={form.control}
              label="Recipient email"
              name="email"
              placeholder="name@example.com"
              required
              maxLength={SEND_REMINDER_EMAIL_MAX_LEN}
            />
            <Button disabled={pending} type="submit">
              {pending ? 'Sending…' : 'Send reminder'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
