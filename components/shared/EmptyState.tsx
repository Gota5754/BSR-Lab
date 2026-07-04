import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-[10px] border border-dashed border-bsr-border px-6 py-12 text-center">
      <p className="heading-serif text-2xl text-bsr-paper-dim">{title}</p>
      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm text-bsr-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
