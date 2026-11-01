import { alef, barrio, dosis } from "@/components/ui/fonts/fonts";
import { CreditLink } from "./creditLink";
import { CreditList } from "./creditList";
import { CreditNote } from "./creditNote";
import { CreditRow } from "./creditRow";

const FONTS = [
  {
    role: "Titles",
    name: "Barrio",
    url: "https://fonts.google.com/specimen/Barrio",
    fontClassName: barrio.className,
  },
  {
    role: "Labels",
    name: "Dosis",
    url: "https://fonts.google.com/specimen/Dosis",
    fontClassName: dosis.className,
  },
  {
    role: "Text",
    name: "Alef",
    url: "https://fonts.google.com/specimen/Alef",
    fontClassName: alef.className,
  },
];

export function FontCredits() {
  return (
    <CreditList>
      {FONTS.map(({ role, name, url, fontClassName }) => (
        <CreditRow key={name} label={role}>
          <span className={`${fontClassName} text-lg`}>
            <CreditLink href={url}>{name}</CreditLink>
          </span>
          <CreditNote>
            Google Fonts ·{" "}
            <CreditLink href="https://openfontlicense.org">
              SIL Open Font License
            </CreditLink>
          </CreditNote>
        </CreditRow>
      ))}
      <CreditRow label="Pairing">
        Suggested by <CreditLink href="https://fontjoy.com">Fontjoy</CreditLink>
      </CreditRow>
    </CreditList>
  );
}
