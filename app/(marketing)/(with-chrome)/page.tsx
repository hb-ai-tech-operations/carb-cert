import type { Metadata } from 'next';

import { SITE_SEO } from '@/constants/seo';
import {
  ContactUs,
  ExemptionsSection,
  FAQSection,
  HeroSection,
  PricingSection,
  ProceduresSection,
  RequirementsIntroSection,
  ServicesSection,
  WhoMustApplySection,
} from '@/features/home-page';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Clean Truck Check Compliance & CTC-VIS Filing Help',
  description: SITE_SEO.defaultDescription,
  canonicalPath: '/',
  keywords: [
    'Clean Truck Check',
    'CARB compliance',
    'California CARB compliance',
    'CTC-VIS',
    'CTC-VIS reporting',
    'California heavy-duty truck compliance',
    'Clean Truck Check certificate',
    'CARB Clean Truck Check',
    'fleet compliance California',
  ],
});

const HomePage = () => (
  <div className="flex flex-col space-y-12 px-0 md:space-y-14">
    <HeroSection />
    <ServicesSection />
    <WhoMustApplySection />
    <RequirementsIntroSection />
    <PricingSection />
    <ExemptionsSection />
    <ProceduresSection />
    <FAQSection />
    <ContactUs />
  </div>
);

HomePage.displayName = 'HomePage';

export default HomePage;
