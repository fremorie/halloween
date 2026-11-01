import type { ReactNode } from "react";

import { dosis } from "@/components/ui/fonts/fonts";

type CreditRowProps = {
  label: string;
  aside?: ReactNode;
  children: ReactNode;
};

export function CreditRow({ label, aside, children }: CreditRowProps) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-3 py-1.5 leading-snug sm:grid-cols-[9rem_1fr] sm:gap-x-4">
      <dt
        className={`${dosis.className} text-xs font-bold tracking-widest text-neutral-600 uppercase`}
      >
        {label}
      </dt>
      <dd className="flex items-baseline justify-between gap-x-3">
        <div>{children}</div>
        {aside && (
          <span className="shrink-0 text-sm text-neutral-600">{aside}</span>
        )}
      </dd>
    </div>
  );
}
