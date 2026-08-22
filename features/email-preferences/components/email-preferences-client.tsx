'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useMutation, useQuery } from 'convex/react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_WITHOUT_FORMAT,
  ROUTES,
} from '@/constants/app';
import { api } from '@/convex/_generated/api';

interface EmailPreferencesClientProps {
  token: string | undefined;
}

const NoTokenCard = () => (
  <Card className="mx-auto w-full max-w-lg border-gray-200 shadow-sm">
    <CardHeader>
      <CardTitle className="text-xl font-semibold tracking-tight">
        Email preferences
      </CardTitle>
      <CardDescription className="text-base font-medium tracking-tight font-anek-latin text-muted-foreground">
        Reminder and compliance-related email settings are updated using the
        secure link included in messages we send. That link confirms it is
        really you, without exposing your address in the URL.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 text-base font-medium tracking-tight font-anek-latin">
      <p>
        If you no longer have the email, reach out and we can help update your
        preferences.
      </p>
      <p>
        <Link
          className="font-semibold text-blue-400 underline hover:text-blue-600"
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </Link>
        {' · '}
        <Link
          className="font-semibold text-blue-400 underline hover:text-blue-600"
          href={`tel:${CONTACT_PHONE_WITHOUT_FORMAT}`}
        >
          {CONTACT_PHONE}
        </Link>
      </p>
    </CardContent>
    <CardFooter>
      <Button asChild variant="outline">
        <Link href={ROUTES.HOME}>Back to home</Link>
      </Button>
    </CardFooter>
  </Card>
);

const LoadingCard = () => (
  <Card className="mx-auto w-full max-w-lg border-gray-200 shadow-sm">
    <CardContent className="pt-8 pb-6">
      <p className="text-center text-base font-medium tracking-tight font-anek-latin text-muted-foreground">
        Loading…
      </p>
    </CardContent>
  </Card>
);

const InvalidTokenCard = () => (
  <Card className="mx-auto w-full max-w-lg border-gray-200 shadow-sm">
    <CardHeader>
      <CardTitle className="text-xl font-semibold tracking-tight">
        Link not valid
      </CardTitle>
      <CardDescription className="text-base font-medium tracking-tight font-anek-latin text-muted-foreground">
        This preferences link is invalid or has expired. Please use the link
        from a recent Carb Cert email, or contact us and we will help you
        update your settings.
      </CardDescription>
    </CardHeader>
    <CardFooter className="flex flex-wrap gap-2">
      <Button asChild variant="outline">
        <Link href={ROUTES.HOME}>Back to home</Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href={`mailto:${CONTACT_EMAIL}`}>Email support</Link>
      </Button>
    </CardFooter>
  </Card>
);

interface PreferencesFormProps {
  preview: { maskedEmail: string; reminderOptOut: boolean; };
  token: string;
}

const PreferencesForm = ({ preview, token }: PreferencesFormProps) => {
  const setPreference = useMutation(api.emailPreferences.setReminderPreference);
  const serverReceive = !preview.reminderOptOut;
  const [draftReceive, setDraftReceive] = useState<boolean | undefined>(

  );
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setDraftReceive(undefined);
  }, [preview.reminderOptOut]);

  const receiveReminders = draftReceive ?? serverReceive;
  const isDirty =
    draftReceive !== undefined && draftReceive !== serverReceive;

  const handleSave = async () => {
    setPending(true);
    setError(null);
    setSaved(false);
    try {
      const result = await setPreference({
        reminderOptOut: !receiveReminders,
        token,
      });
      if (!result.ok) {
        setError(
          'This link is invalid or has expired. Use the link from your latest email or contact us for help.',
        );
        return;
      }
      setSaved(true);
      setDraftReceive(undefined);
    } catch {
      setError('Something went wrong. Please try again or contact us.');
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight">
          Email preferences
        </CardTitle>
        <CardDescription className="text-base font-medium tracking-tight font-anek-latin text-muted-foreground">
          Address on file:{' '}
          <span className="font-semibold text-foreground">
            {preview.maskedEmail}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-3 rounded-lg border border-gray-100 bg-muted/30 px-4 py-3">
          <Checkbox
            checked={receiveReminders}
            className="mt-1"
            id="receive-reminders"
            onCheckedChange={(state) => {
              setDraftReceive(state === true);
              setSaved(false);
              setError(null);
            }}
          />
          <div className="space-y-1">
            <Label
              className="text-base font-medium leading-snug"
              htmlFor="receive-reminders"
            >
              Send me compliance reminder emails
            </Label>
            <p
              className="text-sm font-medium tracking-tight text-muted-foreground font-anek-latin"
              id="receive-reminders-hint"
            >
              Uncheck to stop occasional reminders about Clean Truck Check
              deadlines. We may still email you about orders or support you
              request.
            </p>
          </div>
        </div>
        {error ? (
          <p
            className="text-sm font-medium text-destructive font-anek-latin"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        {saved ? (
          <p
            aria-live="polite"
            className="text-sm font-medium text-green-700 font-anek-latin"
          >
            Your preference has been saved.
          </p>
        ) : null}
        <p className="text-xs font-medium leading-relaxed text-muted-foreground font-anek-latin">
          We process unsubscribe and preference requests promptly. If messages
          continue after you opt out, contact us so we can correct our records.
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button
          disabled={pending || !isDirty}
          onClick={() => {
            handleSave().catch(() => { });
          }}
        >
          {pending ? 'Saving…' : 'Save preference'}
        </Button>
        <Button asChild variant="ghost">
          <Link href={ROUTES.HOME}>Cancel</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export const EmailPreferencesClient = ({ token }: EmailPreferencesClientProps) => {
  const preview = useQuery(
    api.emailPreferences.previewFromToken,
    token ? { token } : 'skip',
  );

  if (token === undefined || token === '') {
    return <NoTokenCard />;
  }

  if (preview === undefined) {
    return <LoadingCard />;
  }

  if (preview === null) {
    return <InvalidTokenCard />;
  }

  return <PreferencesForm preview={preview} token={token} />;
};
