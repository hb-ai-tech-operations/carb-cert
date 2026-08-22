interface SectionHeadingProps {
  description?: string;
  title: string;
}

export const SectionHeading = ({ title, description }: SectionHeadingProps) => (
  <div className="space-y-1 pt-2">
    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
    {description ? (
      <p className="text-muted-foreground text-sm">{description}</p>
    ) : null}
  </div>
);
