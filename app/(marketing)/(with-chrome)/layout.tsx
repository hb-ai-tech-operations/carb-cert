import { Footer } from '@/features/footer';
import { MainHeader } from '@/features/header';

export default function MarketingWithChromeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full space-y-10">
      <MainHeader />
      <main
        id="main-content"
        className="mx-auto focus:outline-none"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
