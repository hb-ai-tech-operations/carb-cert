'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { submitSendCtcPendingFollowupEmail } from '@/actions/send-ctc-pending-followup-page';
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
  SEND_CTC_PENDING_FOLLOWUP_EMAIL_MAX_LEN,
  SEND_CTC_PENDING_FOLLOWUP_NAME_MAX_LEN,
  sendCtcPendingFollowupFormSchema,
  type SendCtcPendingFollowupFormValues,
} from '@/features/send-ctc-pending-followup-page/schemas/send-ctc-pending-followup.schema';

const defaultValues: SendCtcPendingFollowupFormValues = {
  email: '',
  name: '',
};

export const SendCtcPendingFollowupEmailForm = () => {
  const [pending, startTransition] = useTransition();
  const form = useForm<SendCtcPendingFollowupFormValues>({
    defaultValues,
    resolver: zodResolver(sendCtcPendingFollowupFormSchema),
  });

  function onSubmit(data: SendCtcPendingFollowupFormValues) {
    startTransition(() => {
      void (async () => {
        const result = await submitSendCtcPendingFollowupEmail(data);
        if (!result.ok) {
          toast.error('Could not send', {
            description: result.error,
            position: 'top-center',
          });
          return;
        }
        form.reset(defaultValues);
        toast.success('Follow-up sent', {
          description: 'The email was delivered to the recipient.',
          position: 'top-center',
        });
      })();
    });
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Send CTC pending follow-up</CardTitle>
        <CardDescription>
          Sends the pending Clean Truck Check compliance follow-up template to
          the address below.
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
              maxLength={SEND_CTC_PENDING_FOLLOWUP_NAME_MAX_LEN}
            />
            <InputEmail
              control={form.control}
              label="Recipient email"
              name="email"
              placeholder="name@example.com"
              required
              maxLength={SEND_CTC_PENDING_FOLLOWUP_EMAIL_MAX_LEN}
            />
            <Button disabled={pending} type="submit">
              {pending ? 'Sending…' : 'Send follow-up'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
