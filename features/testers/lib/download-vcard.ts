import type { TesterProfile } from '@/features/testers/data/testers';

export const downloadVCard = (tester: TesterProfile) => {
  const [first, ...rest] = tester.name.split(' ');

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${rest.join(' ')};${first};;;`,
    `FN:${tester.name}`,
    ...(tester.organizationName ? [`ORG:${tester.organizationName}`] : []),
    ...(tester.jobTitle ? [`TITLE:${tester.jobTitle}`] : []),
    `TEL;TYPE=WORK,VOICE:${tester.phoneTel}`,
    `EMAIL;TYPE=WORK:${tester.email}`,
    `ADR;TYPE=WORK:;;${tester.location.city};${tester.location.region};;;`,
    'END:VCARD',
  ];

  const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  Object.assign(document.createElement('a'), {
    href: url,
    download: `${tester.name.replace(/\s+/g, '-').toLowerCase()}.vcf`,
  }).click();
  URL.revokeObjectURL(url);
};
