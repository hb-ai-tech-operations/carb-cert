/**
 * Public tester digital cards: no site header/footer so the profile reads as a standalone card.
 */
export default function TesterCardShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative min-h-svh w-full bg-zinc-50">{children}</div>;
}
