import type { Metadata } from 'next';

import { buildPageMetadata } from '@/lib/seo/metadata';

export const testersDirectoryMetadata: Metadata = buildPageMetadata({
  title: 'Certified Testers Directory | CARB Clean Truck Check',
  description:
    'Browse Carb Cert’s directory of CARB Clean Truck Check heavy-duty emissions testers in California. Compare profiles, service areas, and contact a credentialed tester for truck compliance testing.',
  canonicalPath: '/testers',
  keywords: [
    'CARB certified testers',
    'Clean Truck Check tester',
    'heavy-duty emissions tester California',
    'truck emissions compliance testing',
    'California truck tester directory',
    'CARB credentialed tester',
  ],
});
