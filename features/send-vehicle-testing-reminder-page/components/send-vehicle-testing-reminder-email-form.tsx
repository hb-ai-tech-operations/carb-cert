'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { submitSendVehicleTestingReminderEmail } from '@/actions/send-vehicle-testing-reminder-page';
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
  SEND_VEHICLE_TESTING_REMINDER_EMAIL_MAX_LEN,
  SEND_VEHICLE_TESTING_REMINDER_NAME_MAX_LEN,
  sendVehicleTestingReminderFormSchema,
  type SendVehicleTestingReminderFormValues,
} from '@/features/send-vehicle-testing-reminder-page/schemas/send-vehicle-testing-reminder.schema';

const defaultValues: SendVehicleTestingReminderFormValues = {
  email: '',
  name: '',
};

export const SendVehicleTestingReminderEmailForm = () => {
  const [pending, startTransition] = useTransition();
  const form = useForm<SendVehicleTestingReminderFormValues>({
    defaultValues,
    resolver: zodResolver(sendVehicleTestingReminderFormSchema),
  });

  function onSubmit(data: SendVehicleTestingReminderFormValues) {
    startTransition(() => {
      void (async () => {
        const result = await submitSendVehicleTestingReminderEmail(data);
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
        <CardTitle>Send vehicle testing reminder</CardTitle>
        <CardDescription>
          Sends the pending vehicle testing reminder with a link to the
          certified testers directory.
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
              maxLength={SEND_VEHICLE_TESTING_REMINDER_NAME_MAX_LEN}
            />
            <InputEmail
              control={form.control}
              label="Recipient email"
              name="email"
              placeholder="name@example.com"
              required
              maxLength={SEND_VEHICLE_TESTING_REMINDER_EMAIL_MAX_LEN}
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
