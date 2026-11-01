import type { ReactNode } from "react";

type CreditNoteProps = {
  children: ReactNode;
};

export function CreditNote({ children }: CreditNoteProps) {
  return <span className="block text-sm text-neutral-600">{children}</span>;
}
