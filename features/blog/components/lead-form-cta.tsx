import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface LeadFormCtaProps {
  className?: string;
  description?: string;
  title?: string;
}

const LeadFormCta = ({
  className,
  description = 'Submit your vehicles and pay online. The CARB compliance fee is included in our per-vehicle price.',
  title = 'Ready to file your Clean Truck Check reporting?',
}: LeadFormCtaProps) => (
  <Card
    className={`border-primary/30 bg-primary/5 shadow-none not-prose my-10 max-w-none ${className ?? ''}`}
  >
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
      <CardDescription className="text-lg">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link href="/compliance-form" prefetch>
          Start compliance filing
        </Link>
      </Button>
      <p className="text-muted-foreground mt-3 text-sm italic">
        Third-party CTC-VIS assistance—not affiliated with CARB.
      </p>
    </CardContent>
  </Card>
);

LeadFormCta.displayName = 'LeadFormCta';
export { LeadFormCta };
