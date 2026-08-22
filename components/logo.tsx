import Image from 'next/image';
import Link from 'next/link';

const Logo = () => (
  <Link href="/" className="ca-cursor-pointer" aria-label="Home" title="Home" role="button">
    <Image src="/logos/carb-cert-dark.png" alt="Carb Cert Logo" width={112} height={45}
      className="w-28 h-11"
      priority
      style={{ width: '112px', height: '45px' }}
      title="Carb Cert Logo"
    />
  </Link>
);

Logo.displayName = 'Logo';
export { Logo };
