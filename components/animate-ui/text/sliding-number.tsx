/* eslint-disable */
'use client';

import * as React from 'react';
import useMeasure from 'react-use-measure';

import {
  motion,
  type MotionValue,
  type SpringOptions,
  useInView,
  type UseInViewOptions,
  useSpring,
  useTransform,
} from 'motion/react';

import { cn } from '@/lib/utils';

interface SlidingNumberRollerProps {
  place: number;
  prevValue: number;
  transition: SpringOptions;
  value: number;
}

const SlidingNumberRoller = ({
  prevValue,
  value,
  place,
  transition,
}: SlidingNumberRollerProps) => {
  const startNumber = Math.floor(prevValue / place) % 10;
  const targetNumber = Math.floor(value / place) % 10;
  const animatedValue = useSpring(startNumber, transition);

  React.useEffect(() => {
    animatedValue.set(targetNumber);
  }, [targetNumber, animatedValue]);

  const [measureRef, { height }] = useMeasure();

  return (
    <span
      ref={measureRef}
      data-slot="sliding-number-roller"
      className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums"
    >
      <span className="invisible">0</span>
      {Array.from({ length: 10 }, (_, index) => (
        <SlidingNumberDisplay
          key={index}
          motionValue={animatedValue}
          number={index}
          height={height}
          transition={transition}
        />
      ))}
    </span>
  );
};

interface SlidingNumberDisplayProps {
  height: number;
  motionValue: MotionValue<number>;
  number: number;
  transition: SpringOptions;
}

const SlidingNumberDisplay = ({
  motionValue,
  number,
  height,
  transition,
}: SlidingNumberDisplayProps) => {
  const y = useTransform(motionValue, latest => {
    if (!height) {
      return 0;
    }
    const currentNumber = latest % 10;
    const offset = (10 + number - currentNumber) % 10;
    let translateY = offset * height;
    if (offset > 5) {
      translateY -= 10 * height;
    }
    return translateY;
  });

  if (!height) {
    return <span className="invisible absolute">{number}</span>;
  }

  return (
    <motion.span
      data-slot="sliding-number-display"
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
      transition={{ ...transition, type: 'spring' }}
    >
      {number}
    </motion.span>
  );
};

type SlidingNumberProps = React.ComponentProps<'span'> & {
  decimalPlaces?: number;
  decimalSeparator?: string;
  inView?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  inViewOnce?: boolean;
  number: number | string;
  padStart?: boolean;
  transition?: SpringOptions;
};

const SlidingNumber = ({
  ref,
  number,
  className,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  padStart = false,
  decimalSeparator = '.',
  decimalPlaces = 0,
  transition = {
    stiffness: 200,
    damping: 20,
    mass: 0.4,
  },
  ...props
}: SlidingNumberProps) => {
  const localRef = React.useRef<HTMLSpanElement>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLSpanElement);

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  const previousNumberRef = React.useRef<number>(0);

  const effectiveNumber = React.useMemo(
    () => (!isInView ? 0 : Math.abs(Number(number))),
    [number, isInView]
  );

  const formatNumber = React.useCallback(
    (number_: number) =>
      decimalPlaces != null
        ? number_.toFixed(decimalPlaces)
        : number_.toString(),
    [decimalPlaces]
  );

  const numberString = formatNumber(effectiveNumber);
  const [newIntStringRaw, newDecStringRaw = ''] = numberString.split('.');
  const newIntString =
    padStart && newIntStringRaw?.length === 1
      ? `0${newIntStringRaw}`
      : newIntStringRaw;

  const previousFormatted = formatNumber(previousNumberRef.current);
  const [previousIntStringRaw = '', previousDecStringRaw = ''] =
    previousFormatted.split('.');
  const previousIntString =
    padStart && previousIntStringRaw.length === 1
      ? `0${previousIntStringRaw}`
      : previousIntStringRaw;

  const adjustedPreviousInt = React.useMemo(
    () =>
      previousIntString.length > (newIntString?.length ?? 0)
        ? previousIntString.slice(-(newIntString?.length ?? 0))
        : previousIntString.padStart(newIntString?.length ?? 0, '0'),
    [previousIntString, newIntString]
  );

  const adjustedPreviousDec = React.useMemo(() => {
    if (!newDecStringRaw) {
      return '';
    }
    return previousDecStringRaw.length > newDecStringRaw.length
      ? previousDecStringRaw.slice(0, newDecStringRaw.length)
      : previousDecStringRaw.padEnd(newDecStringRaw.length, '0');
  }, [previousDecStringRaw, newDecStringRaw]);

  React.useEffect(() => {
    if (isInView) {
      previousNumberRef.current = effectiveNumber;
    }
  }, [effectiveNumber, isInView]);

  const intDigitCount = newIntString?.length ?? 0;
  const intPlaces = React.useMemo(
    () =>
      Array.from(
        { length: intDigitCount },
        (_, index) => 10 ** (intDigitCount - index - 1)
      ),
    [intDigitCount]
  );
  const decPlaces = React.useMemo(
    () =>
      newDecStringRaw
        ? Array.from(
            { length: newDecStringRaw.length },
            (_, index) => 10 ** (newDecStringRaw.length - index - 1)
          )
        : [],
    [newDecStringRaw]
  );

  const newDecValue = newDecStringRaw ? parseInt(newDecStringRaw, 10) : 0;
  const previousDecValue = adjustedPreviousDec
    ? parseInt(adjustedPreviousDec, 10)
    : 0;

  return (
    <span
      ref={localRef}
      data-slot="sliding-number"
      className={cn('flex items-center', className)}
      {...props}
    >
      {isInView && Number(number) < 0 ? <span className="mr-1">-</span> : null}

      {intPlaces.map(place => (
        <SlidingNumberRoller
          key={`int-${place}`}
          prevValue={parseInt(adjustedPreviousInt, 10)}
          value={parseInt(newIntString ?? '0', 10)}
          place={place}
          transition={transition}
        />
      ))}

      {newDecStringRaw ? (
        <>
          <span>{decimalSeparator}</span>
          {decPlaces.map(place => (
            <SlidingNumberRoller
              key={`dec-${place}`}
              prevValue={previousDecValue}
              value={newDecValue}
              place={place}
              transition={transition}
            />
          ))}
        </>
      ) : null}
    </span>
  );
};

export { SlidingNumber, type SlidingNumberProps };
