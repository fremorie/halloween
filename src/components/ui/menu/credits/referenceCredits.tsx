import { CreditLink } from "./creditLink";
import { CreditList } from "./creditList";
import { CreditRow } from "./creditRow";

export function ReferenceCredits() {
  return (
    <CreditList>
      <CreditRow label="Kuwahara filter">
        Based on{" "}
        <CreditLink href="https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/">
          On Crafting Painterly Shaders
        </CreditLink>{" "}
        by Maxime Heckel
      </CreditRow>
    </CreditList>
  );
}
