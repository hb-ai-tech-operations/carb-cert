import { type FC, type SVGProps, useId } from 'react';

import { PRICE_BASE_FORMATTED } from '@/constants/app';

interface Requirement {
  description: string;
  title: string;
}

const REQUIREMENTS: Requirement[] = [
  {
    title: 'Gross Vehicle Weight Rating (GVWR)',
    description:
      'Applies to vehicles with a GVWR over 14,000 pounds, which includes the vehicle’s empty weight and maximum load capacity.',
  },
  {
    title: 'Engine Model Year',
    description:
      'Clean Truck Check applies to all diesel and alternative-fuel vehicles over 14,000 lbs GVWR, regardless of engine model year. Even engines older than 2010 must pass emissions tests.',
  },
  {
    title: 'Testing Frequency',
    description:
      'Semi-annual testing for most vehicles; annual testing for some agricultural vehicles and motorhomes. Starting October 2027, OBD-equipped vehicles (typically 2013+) transition to quarterly testing.',
  },
  {
    title: 'Emissions Standards',
    description:
      'Vehicles must meet CARB thresholds for pollutants like particulate matter (PM) and nitrogen oxides (NOx) during testing.',
  },
  {
    title: 'Registration (CTC-VIS)',
    description:
      'All vehicles must be registered in the Clean Truck Check Vehicle Inspection System (CTC-VIS). You’ll need the VIN, engine model year, and GVWR.',
  },
  {
    title: 'Annual Compliance Fee',
    description:
      `CARB's Clean Truck Check program requires vehicles to maintain current compliance status. Our ${PRICE_BASE_FORMATTED} service fee covers all required filings and submissions to keep your vehicle compliant.`,
  },
];

const RequirementsSection: FC = () => (
  <section aria-label="Clean Truck Check eligibility and compliance requirements">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {REQUIREMENTS.map(request => (
        <article
          key={request.title}
          className="relative overflow-hidden rounded-3xl bg-linear-to-b from-neutral-100 to-white p-6 dark:from-neutral-900 dark:to-neutral-950"
        >
          {/* decorative grid overlay */}
          <Grid size={20} />
          <h3 className="relative z-10 text-lg font-semibold text-neutral-800 md:text-xl dark:text-white">
            {request.title}
          </h3>
          <p className="relative z-10 mt-3 text-base text-neutral-600 md:text-lg dark:text-neutral-400">
            {request.description}
          </p>
        </article>
      ))}
    </div>
  </section>
);

RequirementsSection.displayName = 'RequirementsSection';
export { RequirementsSection };

// --- Grid + GridPattern (decorative only) ---

interface GridProps {
  pattern?: number[][];
  size?: number;
}

export const Grid: FC<GridProps> = ({ pattern, size = 20 }) => {
  // lightweight randomized square pattern; stable per render
  const defaultPattern: number[][] = Array.from({ length: 5 }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);

  const squares = pattern ?? defaultPattern;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mask-[linear-gradient(white,transparent)]"
    >
      <div className="from-primary/20 to-primary/30 absolute inset-0 bg-linear-to-r mask-[radial-gradient(farthest-side_at_top,white,transparent)]">
        <GridPattern
          width={size}
          height={size}
          x={-12}
          y={4}
          squares={squares}
          className="fill-primary/30 stroke-primary/30 absolute inset-0 h-full w-full mix-blend-overlay"
        />
      </div>
    </div>
  );
};

type GridPatternProps = SVGProps<SVGSVGElement> & {
  height: number;
  squares: number[][];
  width: number;
  x: number;
  y: number;
};

export const GridPattern: FC<GridPatternProps> = ({
  width,
  height,
  x,
  y,
  squares,
  ...svgProps
}) => {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...svgProps}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />

      <svg x={x} y={y} className="overflow-visible">
        {squares.map(([sx, sy], index) => (
          <rect
            key={`${sx}-${sy}-${index}`}
            width={width + 1}
            height={height + 1}
            x={sx * width}
            y={sy * height}
            strokeWidth={0}
          />
        ))}
      </svg>
    </svg>
  );
};
