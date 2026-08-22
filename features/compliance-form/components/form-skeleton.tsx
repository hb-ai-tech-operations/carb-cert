import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const STEP_COUNT = 3;
const FIELD_COUNT = 6;

export const FormSkeleton = () => (
  <Card className="w-full shadow-none">
    <CardHeader className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: STEP_COUNT }, (_, index) => (
          <Skeleton key={index} className="h-8 w-24" />
        ))}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {Array.from({ length: FIELD_COUNT }, (_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Skeleton className="h-12 w-48" />
      <Skeleton className="h-12 w-48" />
    </CardFooter>
  </Card>
);

FormSkeleton.displayName = 'FormSkeleton';
