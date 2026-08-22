// not indexed by search engines
import Image from 'next/image';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: 'Digital Business Card Demo',
  description: 'Preview of a CARB tester digital business card experience.',
  alternates: { canonical: '/demo' },
};

const credentials = [
  { icon: 'verified', label: 'CARB Certified', accent: true },
  { icon: 'workspace_premium', label: 'ASE Master Tech' },
  { icon: 'policy', label: 'Bureau of Automotive Repair' },
];

const services = [
  {
    title: 'Smog Check Inspection',
    description: 'Full regulatory compliance testing for all vehicle classes.',
    icon: 'eco',
    featured: true,
  },
  { title: 'Evaporative System Testing', icon: 'air' },
  { title: 'OBD-II Diagnostics', icon: 'settings_input_component' },
  { title: 'Heavy-Duty Diesel Smoke Test', icon: 'air_freshener', row: true },
];

const pricing = [
  { label: 'Standard Smog Check', price: '$65' },
  { label: 'Heavy-Duty Diesel Smoke Test', price: '$120' },
  { label: 'OBD-II Diagnostics', price: '$45' },
  { label: 'Evaporative System Testing', price: '$85' },
];

// Single-file marketing demo intentionally kept in one component for easier edits by non-engineering testers.
// eslint-disable-next-line max-lines-per-function
function DemoPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col px-4 pt-16 sm:px-6">
      <main className="mx-auto w-full max-w-md pb-20 pt-8">
        <section className="relative">
          <div className="h-32 rounded-2xl bg-linear-to-br from-primary to-secondary" />
          <div className="-mt-12 px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-surface-container-lowest shadow-md">
                  <Image
                    className="h-full w-full object-cover"
                    src="/web-app-manifest-512x512.png"
                    alt="Close up portrait of Alex Johnson, a senior emissions technician with a confident and professional demeanor"
                    width={96}
                    height={96}
                  />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-on-surface">Alex Johnson</h1>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Senior Emissions Technician</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-outline">
                  <span className="material-symbols-outlined text-sm" data-icon="location_on">location_on</span>
                  Sacramento, CA
                </div>
              </div>
              <div className="mt-8 flex justify-center gap-4">
                <a className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="tel:#">
                  <span className="material-symbols-outlined" data-icon="call">call</span>
                </a>
                <a className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-all duration-300" href="mailto:#">
                  <span className="material-symbols-outlined" data-icon="mail">mail</span>
                </a>
                <a
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high text-primary transition-all duration-300 hover:bg-primary hover:text-on-primary"
                  href="https://ww2.arb.ca.gov/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="material-symbols-outlined" data-icon="language">language</span>
                </a>
              </div>
              <button className="w-full mt-8 bg-primary text-on-primary py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
                <span className="material-symbols-outlined" data-icon="save">save</span>
                Add to Contacts
              </button>
              <button className="w-full mt-3 border-2 border-primary text-primary py-3.5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary/5 active:scale-[0.98] transition-all duration-200">
                <span className="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
                Book an Appointment
              </button>
            </div>
          </div>
        </section>
        <section className="mt-8 px-4 sm:px-6">
          <h2 className="mb-4 px-2 text-xs font-bold uppercase tracking-widest text-outline">Official Credentials</h2>
          <div className="flex flex-wrap gap-2">
            {credentials.map((credential) => (
              <div
                key={credential.label}
                className={`flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-bold ${credential.accent
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-high text-on-surface-variant'
                  }`}
              >
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon={credential.icon}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {credential.icon}
                </span>
                {credential.label}
              </div>
            ))}
          </div>
        </section>
        <section className="mt-10 px-4 sm:px-6">
          <h2 className="mb-4 px-2 text-xs font-bold uppercase tracking-widest text-outline">Core Services</h2>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => {
              if (service.featured) {
                return (
                  <div key={service.title} className="col-span-2 rounded-lg border-l-4 border-primary bg-surface-container-lowest p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <span className="material-symbols-outlined" data-icon={service.icon}>
                          {service.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-on-surface">{service.title}</h3>
                        <p className="mt-1 text-xs text-on-surface-variant">{service.description}</p>
                      </div>
                    </div>
                  </div>
                );
              }

              if (service.row) {
                return (
                  <div key={service.title} className="col-span-2 rounded-lg bg-surface-container-lowest p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary" data-icon={service.icon}>
                          {service.icon}
                        </span>
                        <h3 className="text-sm font-bold text-on-surface">{service.title}</h3>
                      </div>
                      <span className="material-symbols-outlined text-outline-variant" data-icon="chevron_right">chevron_right</span>
                    </div>
                  </div>
                );
              }

              return (
                <div key={service.title} className="rounded-lg bg-surface-container-lowest p-4 shadow-sm">
                  <span className="material-symbols-outlined mb-2 text-secondary" data-icon={service.icon}>
                    {service.icon}
                  </span>
                  <h3 className="text-sm font-bold leading-tight text-on-surface">{service.title}</h3>
                </div>
              );
            })}
          </div>
        </section>
        <section className="mt-10 px-4 sm:px-6">
          <h2 className="mb-4 px-2 text-xs font-bold uppercase tracking-widest text-outline">Service Pricing</h2>
          <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-sm">
            <div className="divide-y divide-outline-variant/20">
              {pricing.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 transition-colors duration-200 hover:bg-surface-container-low">
                  <span className="text-sm font-medium text-on-surface">{item.label}</span>
                  <span className="text-sm font-bold text-primary">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-20 mt-10 px-4 sm:px-6">
          <div className="flex flex-col items-center rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-8">
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-outline">Scan to Share Profile</p>
            <div className="p-3 bg-white rounded-xl shadow-inner mb-6">
              <Image
                className="h-32 w-32 opacity-80"
                src="/public/web-app-manifest-512x512.png"
                alt="A clean, modern QR code on a white rounded background used for digital contact exchange"
                width={128}
                height={128}
              />
            </div>
            <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
              <span className="material-symbols-outlined text-base" data-icon="share">share</span>
              Share via Airdrop or Link
            </button>
          </div>
          <footer className="mt-8 pb-4 text-center text-[10px] font-medium uppercase tracking-wide text-outline">
            Official Emissions Verification Profile<br />
            © 2024 California Air Resources Board Partner
          </footer>
        </section>
      </main>
    </div>
  );
}

export default DemoPage;