'use client';

import { type ReactNode, useEffect, useRef } from 'react';

import { annotate } from 'rough-notation';

// Define available annotation actions
type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

// Custom TypeScript interface for supported props
interface HighlighterProps {
  action?: AnnotationAction;
  animationDuration?: number;
  children: ReactNode;
  color?: string;
  iterations?: number;
  multiline?: boolean;
  padding?: number;
  strokeWidth?: number;
}

export const Highlighter = ({
  children,
  action = 'highlight',
  color = '#ffd1dc', // Default pink color
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
}: HighlighterProps) => {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element !== null) {
      const annotation = annotate(element, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      });

      annotation.show();

      // Store the current element in closure for cleanup
      return () => {
        annotate(element, { type: action }).remove();
      };
    }
  }, [
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
};
