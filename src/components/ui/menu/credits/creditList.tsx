import type { ReactNode } from "react";

type CreditListProps = {
  children: ReactNode;
};

export function CreditList({ children }: CreditListProps) {
  return <dl className="divide-y divide-neutral-900/15">{children}</dl>;
}
