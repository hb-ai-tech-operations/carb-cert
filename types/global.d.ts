// Global type definitions for the application

export interface BaseComponent {
  children?: React.ReactNode;
  className?: string;
}

export interface BaseProps {
  'data-testid'?: string;
  id?: string;
}

// Common UI component props
export interface ButtonVariants {
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'ghost'
    | 'link';
}

// Navigation types
export interface NavigationItem {
  external?: boolean;
  href: string;
  label: string;
}

// Environment types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
      RESEND_API_KEY: string;
      SMTP_FROM: string;
      SMTP_HOST: string;
      SMTP_PASSWORD: string;
      SMTP_PORT: string;
      SMTP_SECURE: string;
      SMTP_USER: string;
    }
  }
}

export {};
