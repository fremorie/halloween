import type { ReactNode } from "react";

type CreditLinkProps = {
  href: string;
  children: ReactNode;
};

export function CreditLink({ href, children }: CreditLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-1 underline-offset-2 outline-offset-2 hover:decoration-2 focus-visible:outline-2"
    >
      {children}
    </a>
  );
}
