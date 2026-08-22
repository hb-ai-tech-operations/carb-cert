import { IconCircleDashed, IconCircleDashedCheck } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  isActive: boolean;
  isCompleted: boolean;
  step: { key: number; label: string; };
}

const StepIndicator = ({ step, isActive, isCompleted }: StepIndicatorProps) => (
  <div
    className={cn(
      // Base styles
      'flex min-w-40 flex-1 flex-col gap-1 rounded-md border px-3 py-2 transition-colors',
      // Active state
      isActive && 'border-slate-500 bg-slate-500/10 text-slate-600',
      // Completed state
      isCompleted && 'border-primary bg-primary/10 text-emerald-600',
      // Default state
      !isActive && !isCompleted && 'border-border bg-transparent text-muted-foreground'
    )}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium uppercase tracking-widest opacity-80">
        Step {step.key}
      </span>
      <span className="flex items-center justify-center">
        {isCompleted ? (
          <IconCircleDashedCheck className="size-6 text-emerald-600" aria-label="Completed" />
        ) : (
          <IconCircleDashed
            className={cn(
              'size-6 text-muted-foreground/40',
              isActive && 'text-blue-500 animate-[spin_4s_linear_infinite]'
            )}
            aria-label={isActive ? 'Active' : 'Not started'}
          />
        )}
      </span>
    </div>
    <span className="text-base font-semibold">{step.label}</span>
  </div>
);

StepIndicator.displayName = 'StepIndicator';
export { StepIndicator };
