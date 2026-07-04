type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h1 className="heading-serif text-4xl text-bsr-paper md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-sm text-bsr-paper-dim">
          {description}
        </p>
      )}
    </div>
  );
}
