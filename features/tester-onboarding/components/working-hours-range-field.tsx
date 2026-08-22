'use client';

import { useEffect, useState } from 'react';

import type { Control, FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Period = 'AM' | 'PM';

interface TimeParts {
  hour12: number;
  minute: number;
  period: Period;
}

const DEFAULT_START: TimeParts = { hour12: 9, minute: 0, period: 'AM' };
const DEFAULT_END: TimeParts = { hour12: 5, minute: 0, period: 'PM' };

const HOUR_OPTIONS = Array.from({ length: 12 }, (_, index) => {
  const hour = index + 1;
  return { label: String(hour), value: String(hour) };
});

const MINUTE_OPTIONS = Array.from({ length: 12 }, (_, index) => {
  const minute = index * 5;
  const label = String(minute).padStart(2, '0');
  return { label, value: String(minute) };
});

const PERIOD_OPTIONS: Array<{ label: string; value: Period }> = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
];

function parseTimePart(part: string): TimeParts | null {
  const match = part.trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (!match) {
    return null;
  }
  const hourRaw = Number.parseInt(match[1], 10);
  const minuteRaw = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase() as Period;
  if (
    hourRaw < 1 ||
    hourRaw > 12 ||
    minuteRaw < 0 ||
    minuteRaw > 59 ||
    (period !== 'AM' && period !== 'PM')
  ) {
    return null;
  }
  return { hour12: hourRaw, minute: minuteRaw, period };
}

function parseRange(
  value: string
): { end: TimeParts; start: TimeParts } | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  const segments = trimmed.split(/\s*[–−-]\s+/);
  if (segments.length !== 2) {
    return null;
  }
  const start = parseTimePart(segments[0]);
  const end = parseTimePart(segments[1]);
  if (!start || !end) {
    return null;
  }
  return { start, end };
}

function formatTimePart(parts: TimeParts): string {
  const minuteLabel = String(parts.minute).padStart(2, '0');
  return `${parts.hour12}:${minuteLabel} ${parts.period}`;
}

function formatRange(start: TimeParts, end: TimeParts): string {
  return `${formatTimePart(start)} – ${formatTimePart(end)}`;
}

interface TimeSelectGroupProps {
  label: string;
  onChange: (next: TimeParts) => void;
  parts: TimeParts;
}

const TimeSelectGroup = ({ label, parts, onChange }: TimeSelectGroupProps) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-medium text-foreground">{label}</span>
    <div className="flex flex-wrap gap-2">
      <Select
        value={String(parts.hour12)}
        onValueChange={value => {
          const hour12 = Number.parseInt(value, 10);
          if (hour12 >= 1 && hour12 <= 12) {
            onChange({ ...parts, hour12 });
          }
        }}
      >
        <SelectTrigger
          className={cn('input-carb-cert w-[4.75rem]')}
          aria-label={`${label} hour`}
        >
          <SelectValue placeholder="Hr" />
        </SelectTrigger>
        <SelectContent position="popper" className="ca-cursor-pointer">
          {HOUR_OPTIONS.map(option => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="ca-cursor-pointer text-lg"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={String(parts.minute)}
        onValueChange={value => {
          const minute = Number.parseInt(value, 10);
          if (minute >= 0 && minute <= 59) {
            onChange({ ...parts, minute });
          }
        }}
      >
        <SelectTrigger
          className={cn('input-carb-cert w-[4.75rem]')}
          aria-label={`${label} minute`}
        >
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent position="popper" className="ca-cursor-pointer">
          {MINUTE_OPTIONS.map(option => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="ca-cursor-pointer text-lg"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={parts.period}
        onValueChange={value => {
          if (value === 'AM' || value === 'PM') {
            onChange({ ...parts, period: value });
          }
        }}
      >
        <SelectTrigger
          className={cn('input-carb-cert w-[5.25rem]')}
          aria-label={`${label} AM or PM`}
        >
          <SelectValue placeholder="AM/PM" />
        </SelectTrigger>
        <SelectContent position="popper" className="ca-cursor-pointer">
          {PERIOD_OPTIONS.map(option => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="ca-cursor-pointer text-lg"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
);

interface WorkingHoursRangeFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const WorkingHoursRangeField = <T extends FieldValues>({
  control,
  name,
}: WorkingHoursRangeFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="gap-1 text-base">
          Working hours
          <span className="text-destructive" aria-hidden>
            {' '}
            *
          </span>
        </FormLabel>
        <FormControl>
          <input type="hidden" {...field} value={field.value ?? ''} />
        </FormControl>
        <WorkingHoursRangeInner
          value={typeof field.value === 'string' ? field.value : ''}
          onBlur={field.onBlur}
          onChange={field.onChange}
        />
        <FormDescription>
          Typical open and close time for the days you selected (12-hour clock,
          5-minute steps).
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

interface WorkingHoursRangeInnerProps {
  onBlur: () => void;
  onChange: (value: string) => void;
  value: string;
}

const WorkingHoursRangeInner = ({
  value,
  onChange,
  onBlur,
}: WorkingHoursRangeInnerProps) => {
  const parsed = parseRange(value);
  const [start, setStart] = useState<TimeParts>(parsed?.start ?? DEFAULT_START);
  const [end, setEnd] = useState<TimeParts>(parsed?.end ?? DEFAULT_END);

  useEffect(() => {
    const next = parseRange(value);
    if (next) {
      setStart(next.start);
      setEnd(next.end);
    }
  }, [value]);

  const commit = (nextStart: TimeParts, nextEnd: TimeParts) => {
    setStart(nextStart);
    setEnd(nextEnd);
    onChange(formatRange(nextStart, nextEnd));
  };

  return (
    <div
      className="flex flex-col gap-4 rounded-lg border border-input bg-background px-3 py-4 sm:px-4"
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onBlur();
        }
      }}
    >
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Preview:</span>{' '}
        {formatRange(start, end)}
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <TimeSelectGroup
          label="Opens"
          parts={start}
          onChange={next => commit(next, end)}
        />
        <span
          className="hidden text-muted-foreground sm:mb-2 sm:block"
          aria-hidden
        >
          –
        </span>
        <TimeSelectGroup
          label="Closes"
          parts={end}
          onChange={next => commit(start, next)}
        />
      </div>
    </div>
  );
};
