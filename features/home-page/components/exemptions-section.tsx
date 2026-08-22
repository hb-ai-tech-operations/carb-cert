import Image from 'next/image';

import { AnimatedList } from '@/components/ui/animated-list';
import { Highlighter } from '@/components/ui/highlighter';
import { cn } from '@/lib/utils';

const ORBIT_CONFIG = [
  { src: '/icons/bdo71ftllaxrfwrci9zl.avif', alt: 'Electric Vehicle' },
  { src: '/icons/hntec7vm1wuituwxbvhk.avif', alt: 'Emergency Vehicle' },
  { src: '/icons/izyjsatph3wyqv5cairo.avif', alt: 'Historical Vehicle' },
  { src: '/icons/n6azrjpsbiz2zqu16gyw.avif', alt: 'Military Vehicle' },
] as const;

const EXEMPTIONS_CONTENT = [
  {
    slug: 'electric-and-fuel-cell-vehicles',
    title: 'Zero-Emission Vehicles',
    description: 'Fully electric and hydrogen fuel cell vehicles are exempt.',
  },
  {
    slug: 'first-response-vehicles',
    title: 'Emergency Vehicles',
    description:
      'Fire trucks, ambulances, police vehicles, and other authorized emergency response vehicles.',
  },
  {
    slug: 'vintage-commercial-vehicles',
    title: 'Military & Historic Vehicles',
    description:
      'Tactical military equipment and registered historical vehicles are excluded.',
  },
  {
    slug: 'specialized-military-equipment',
    title: 'Specialized Exemptions',
    description:
      'Experimental engines or certified ultra-low NOx engines (0.01 g/bhp-hr) may qualify for exemption until 2027.',
  },
] as const;

// Limit to 8 items for better performance while maintaining visual effect
const vehicleTypes = Array.from({ length: 2 }, () => ORBIT_CONFIG).flat();

const NotificationCard = ({ src, alt }: { alt: string; src: string; }) => (
  <figure
    className={cn(
      'relative mx-auto w-full max-w-[300px] cursor-pointer overflow-hidden rounded-2xl p-4 md:max-w-[400px]',
      'bg-white transition-transform duration-200 ease-in-out hover:scale-[1.03]',
      '[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]'
    )}
  >
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-2xl">
        <Image src={src} alt={alt} width={40} height={40} title={alt} />
      </div>
      <figcaption className="truncate text-sm font-medium md:text-lg" aria-label={alt}>
        {alt}
      </figcaption>
    </div>
  </figure>
);

const ExemptionsList = () => (
  <ul className="space-y-3 md:space-y-6">
    {EXEMPTIONS_CONTENT.map(({ slug, title, description }) => (
      <li
        key={slug}
        id={slug}
        className="border-primary border-l-4 pl-3 md:pl-4"
      >
        <article>
          <h3 className="text-foreground mb-2 text-lg font-semibold md:text-xl">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed md:text-lg">
            {description}
          </p>
        </article>
      </li>
    ))}
  </ul>
);

const NotificationList = () => (
  // decorative/ambient list of vehicle types
  <AnimatedList aria-hidden="true">
    {vehicleTypes.map(({ src, alt }, index) => (
      <NotificationCard key={`${alt}-${index}`} src={src} alt={alt} />
    ))}
  </AnimatedList>
);

export const ExemptionsSection = () => (
  <section
    id="clean-truck-check-exemptions"
    aria-labelledby="exemptions-title"
    className="mx-auto max-w-6xl space-y-12 px-2 md:space-y-14 md:px-0"
  >
    <header className="space-y-3 text-center">
      <h2
        id="exemptions-title"
        className="mx-auto max-w-sm text-3xl font-semibold tracking-tight md:max-w-3xl md:text-4xl"
      >
        Clean Truck Check Exemptions
      </h2>
      <p className="text-muted-foreground text-lg md:text-xl">
        <Highlighter action="underline" color="#FF9800">
          Not every vehicle must participate.
        </Highlighter>{' '}
        These vehicles are generally exempt from Clean Truck Check requirements.
      </p>
    </header>

    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
      {/* Left: content list */}
      <div className="md:col-span-3">
        <ExemptionsList />
      </div>

      {/* Right: scrolling/animated icons */}
      <aside className="lg:col-span-2">
        <div className="relative h-[380px] overflow-hidden p-2">
          <NotificationList />
          <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-linear-to-t to-transparent" />
        </div>
      </aside>
    </div>
  </section>
);
