import { CreditLink } from "./creditLink";
import { CreditList } from "./creditList";
import { CreditRow } from "./creditRow";
import { SOUND_CREDITS } from "./soundCreditList";

export function SoundCredits() {
  return (
    <CreditList>
      <CreditRow label="Theme music" aside="Non-commercial">
        Generated with <CreditLink href="https://suno.com">Suno</CreditLink>
      </CreditRow>
      {SOUND_CREDITS.map(({ sound, track, trackUrl, author, license }) => (
        <CreditRow
          key={sound}
          label={sound}
          aside={<CreditLink href={license.url}>{license.name}</CreditLink>}
        >
          <CreditLink href={trackUrl}>{track}</CreditLink>{" "}
          <span className="text-sm whitespace-nowrap text-neutral-600">
            by {author}
          </span>
        </CreditRow>
      ))}
    </CreditList>
  );
}
