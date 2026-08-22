'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { sendContactUsMessage } from '@/actions/send-contact-us';
import {
  InputEmail,
  InputTel,
  InputText,
  InputTextarea,
} from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  contactUsFormSchema,
  type ContactUsFormValues,
} from '@/features/home-page/schemas/contact-us.schema';

const defaultValues: ContactUsFormValues = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  message: '',
};

export const ContactUsForm = () => {
  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues,
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: ContactUsFormValues) {
    const { ok, error } = await sendContactUsMessage(data);
    if (!ok) {
      toast.error('Could not send message', {
        description: error,
        duration: 6000,
        position: 'top-center',
      });
      return;
    }
    form.reset(defaultValues);
    toast.success('Message sent', {
      description: 'We will get back to you shortly.',
      duration: 5000,
      position: 'top-center',
    });
  }

  return (
    <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-8">
      <h3 className="text-center text-2xl font-semibold">
        Please enter your details below
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
          noValidate
        >
          <InputText
            control={form.control}
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            required
            maxLength={50}
          />
          <InputEmail
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            required
            maxLength={100}
          />
          <InputTel
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="Enter your phone number"
            required
            maxLength={15}
          />
          <InputText
            control={form.control}
            name="companyName"
            label="Company Name"
            placeholder="Enter your company name"
            required
            maxLength={50}
          />
          <InputTextarea
            control={form.control}
            name="message"
            label="Message"
            placeholder="Enter your message"
            required
            maxLength={500}
            textareaClassName="h-48 max-h-96 min-h-32 resize-y"
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
