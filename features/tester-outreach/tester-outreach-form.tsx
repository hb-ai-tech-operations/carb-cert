'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { sendTesterOutreachEmail } from '@/actions/send-tester-outreach-email';
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
  TESTER_OUTREACH_EMAIL_MAX_LEN,
  TESTER_OUTREACH_NAME_MAX_LEN,
  testerOutreachFormSchema,
  type TesterOutreachFormValues,
} from '@/features/tester-outreach/schema';

const defaultValues: TesterOutreachFormValues = {
  email: '',
  name: '',
};

export function TesterOutreachForm() {
  const [pending, startTransition] = useTransition();
  const form = useForm<TesterOutreachFormValues>({
    defaultValues,
    resolver: zodResolver(testerOutreachFormSchema),
  });

  function onSubmit(data: TesterOutreachFormValues) {
    startTransition(() => {
      void (async () => {
        const result = await sendTesterOutreachEmail(data);
        if (!result.ok) {
          toast.error('Could not send', {
            description: result.error,
            position: 'top-center',
          });
          return;
        }
        form.reset(defaultValues);
        toast.success('Email sent', {
          description: 'The tester outreach message was delivered.',
          position: 'top-center',
        });
      })();
    });
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Send tester outreach</CardTitle>
        <CardDescription>
          Sends the Carb Cert partnership message to a certified tester
          prospect.
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
              maxLength={TESTER_OUTREACH_NAME_MAX_LEN}
            />
            <InputEmail
              control={form.control}
              label="Recipient email"
              name="email"
              placeholder="name@example.com"
              required
              maxLength={TESTER_OUTREACH_EMAIL_MAX_LEN}
            />
            <Button disabled={pending} type="submit">
              {pending ? 'Sending…' : 'Send email'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
