import Link from 'next/link';

import { Mail, Phone } from 'lucide-react';

import { ContactUsBenefitItem } from './contact-us-benefit-item';
import { ContactUsForm } from './contact-us-form';

import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_WITHOUT_FORMAT,
} from '@/constants/app';
import { CONTACT_US_BENEFITS } from '@/features/home-page/constants/contact-us-content';

const contactLinkClassName =
  'flex items-center gap-2 font-anek-latin font-semibold tracking-tight text-blue-800 underline hover:text-blue-600';

export const ContactUs = () => (
  <section
    id="contact-us"
    aria-labelledby="contact-us-title"
    className="mx-2 space-y-10 rounded-3xl bg-[#f8f6f5]/50 p-8 px-4 md:space-y-8 md:px-8"
  >
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="mx-auto flex flex-col items-center gap-3 text-center">
        <h2
          id="contact-us-title"
          className="text-3xl font-semibold text- md:text-4xl"
        >
          Contact Us
        </h2>
        <p className="text-lg md:text-xl">
          We&apos;re here to help you with your Clean Truck Check compliance.
        </p>
      </header>

      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <h3 className="text-5xl font-semibold">
            Talk to an <span className="text-green-600">Expert</span> Today
          </h3>
          <p className="text-lg md:text-xl">
            Get in touch with our team for any question about the Clean Truck
            Check program.
          </p>
          {CONTACT_US_BENEFITS.map(({ description, icon: Icon, title }) => (
            <ContactUsBenefitItem
              key={title}
              Icon={Icon}
              title={title}
              description={description}
            />
          ))}

          <Link
            href={`tel:${CONTACT_PHONE_WITHOUT_FORMAT}`}
            className={contactLinkClassName}
          >
            <Phone className="size-6 stroke-2 text-primary" />
            {CONTACT_PHONE}
          </Link>
          <Link href={`mailto:${CONTACT_EMAIL}`} className={contactLinkClassName}>
            <Mail className="size-6 stroke-2 text-primary" />
            {CONTACT_EMAIL}
          </Link>
        </div>
        <ContactUsForm />
      </div>
    </div>
  </section>
);

ContactUs.displayName = 'ContactUs';
