'use client';

import { Suspense, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Lock } from 'lucide-react';

import { InputEmail, InputText } from '@/components/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  SIGN_IN_EMAIL_MAX_LEN,
  SIGN_IN_PASSWORD_MAX_LEN,
  signInFormSchema,
  type SignInFormValues,
} from '@/features/auth/sign-in-schema';
import { authClient } from '@/lib/auth-client';

function safePostSignInPath(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) {
    return '/dashboard';
  }
  return raw.startsWith('/dashboard') ? raw : '/dashboard';
}

const defaultValues: SignInFormValues = {
  email: '',
  password: '',
};

function SignInFormSkeleton() {
  return (
    <Card className="w-full max-w-md border-border/80 shadow-lg shadow-primary/5">
      <CardHeader className="space-y-3 pb-2">
        <div className="mx-auto h-12 w-12 animate-pulse rounded-xl bg-muted sm:mx-0" />
        <div className="mx-auto h-8 w-48 animate-pulse rounded-md bg-muted sm:mx-0" />
        <div className="mx-auto h-4 w-full max-w-xs animate-pulse rounded-md bg-muted sm:mx-0" />
      </CardHeader>
      <CardContent className="flex flex-col gap-5 pt-2">
        <div className="h-16 animate-pulse rounded-md bg-muted" />
        <div className="h-16 animate-pulse rounded-md bg-muted" />
      </CardContent>
      <CardFooter className="pt-2">
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      </CardFooter>
    </Card>
  );
}

function SignInFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [serverError, setServerError] = useState('');

  const form = useForm<SignInFormValues>({
    defaultValues,
    mode: 'onTouched',
    resolver: zodResolver(signInFormSchema),
  });

  function onSubmit(values: SignInFormValues) {
    setServerError('');
    startTransition(() => {
      void (async () => {
        const result = await authClient.signIn.email({
          email: values.email,
          password: values.password,
        });

        if (result.error) {
          setServerError(result.error.message ?? 'Sign in failed. Try again.');
          return;
        }

        router.refresh();
        router.push(safePostSignInPath(searchParams.get('callbackUrl')));
      })();
    });
  }

  return (
    <Card className="w-full max-w-md border-border/80 shadow-lg shadow-primary/5">
      <CardHeader className="space-y-1 pb-2 text-center sm:text-left">
        <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary sm:mx-0">
          <Lock className="size-6" aria-hidden />
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Sign in
        </CardTitle>
        <CardDescription className="text-pretty text-base">
          Use your team credentials to open the dashboard.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          className="contents"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <CardContent className="flex flex-col gap-5 pt-2">
            {serverError ? (
              <Alert variant="destructive" role="alert">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            ) : null}
            <InputEmail
              control={form.control}
              disabled={pending}
              icon="email"
              label="Email"
              maxLength={SIGN_IN_EMAIL_MAX_LEN}
              name="email"
              placeholder="you@company.com"
              required
            />
            <InputText
              autoComplete="current-password"
              control={form.control}
              disabled={pending}
              label="Password"
              maxLength={SIGN_IN_PASSWORD_MAX_LEN}
              name="password"
              placeholder="Enter your password"
              required
              type="password"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button className="w-full gap-2" disabled={pending} type="submit">
              {pending ? (
                <>
                  <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden />
                  Signing in…
                </>
              ) : (
                'Continue'
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <Link
                className="font-medium text-primary underline-offset-4 hover:underline"
                href="/"
              >
                Back to website
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export function SignInForm() {
  return (
    <Suspense fallback={<SignInFormSkeleton />}>
      <SignInFormInner />
    </Suspense>
  );
}
