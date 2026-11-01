import type { ReactNode } from "react";

import { dosis } from "@/components/ui/fonts/fonts";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-1.5">
      <h4
        className={`${dosis.className} text-xs font-bold tracking-widest text-neutral-600 uppercase`}
      >
        {title}
      </h4>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}
