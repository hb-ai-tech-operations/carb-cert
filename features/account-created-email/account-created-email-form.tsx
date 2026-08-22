'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { sendAccountCreatedNotificationEmail } from '@/actions/send-account-created-email';
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
import { DEFAULT_TESTERS_SEARCH_URL } from '@/emails/clean-truck-check-account-created-email';
import {
  accountCreatedEmailFormSchema,
  type AccountCreatedEmailFormValues,
  CUSTOMER_NAME_MAX_LEN,
  ENTITY_ID_MAX_LEN,
  RECIPIENT_EMAIL_MAX_LEN,
  TESTERS_URL_MAX_LEN,
  TESTING_TYPE_MAX_LEN,
  VIN_MAX_LEN,
} from '@/features/account-created-email/schema';

const defaultValues: AccountCreatedEmailFormValues = {
  customerName: '',
  entityId: '',
  recipientEmail: '',
  testersSearchUrl: DEFAULT_TESTERS_SEARCH_URL,
  testingType: '',
  vin: '',
};

export const AccountCreatedEmailForm = () => {
  const [pending, startTransition] = useTransition();
  const form = useForm<AccountCreatedEmailFormValues>({
    defaultValues,
    resolver: zodResolver(accountCreatedEmailFormSchema),
  });

  function onSubmit(data: AccountCreatedEmailFormValues) {
    startTransition(() => {
      void (async () => {
        const result = await sendAccountCreatedNotificationEmail(data);
        if (!result.ok) {
          toast.error('Could not send', {
            description: result.error,
            position: 'top-center',
          });
          return;
        }
        form.reset(defaultValues);
        toast.success('Email sent', {
          description: 'The account-created message was delivered.',
          position: 'top-center',
        });
      })();
    });
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Send account-created email</CardTitle>
        <CardDescription>
          Sends the Clean Truck Check account confirmation template with Entity
          ID, VIN, testing type, and testers search link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputEmail
              control={form.control}
              label="Recipient email"
              name="recipientEmail"
              placeholder="name@example.com"
              required
              maxLength={RECIPIENT_EMAIL_MAX_LEN}
            />
            <InputText
              control={form.control}
              label="Customer name (in greeting)"
              name="customerName"
              placeholder="Name as it appears in the email"
              required
              maxLength={CUSTOMER_NAME_MAX_LEN}
            />
            <InputText
              control={form.control}
              label="Entity ID"
              name="entityId"
              placeholder="e.g. E255921"
              required
              maxLength={ENTITY_ID_MAX_LEN}
            />
            <InputText
              control={form.control}
              label="VIN"
              name="vin"
              placeholder="Vehicle identification number"
              required
              maxLength={VIN_MAX_LEN}
            />
            <InputText
              control={form.control}
              label="Recommended testing type"
              name="testingType"
              placeholder="e.g. OVI (Opacity & Visual Inspection)"
              required
              maxLength={TESTING_TYPE_MAX_LEN}
            />
            <InputText
              control={form.control}
              description="Leave as default to use the standard Tableau testers map, or paste another URL."
              label="Testers search URL"
              name="testersSearchUrl"
              placeholder={DEFAULT_TESTERS_SEARCH_URL}
              maxLength={TESTERS_URL_MAX_LEN}
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
