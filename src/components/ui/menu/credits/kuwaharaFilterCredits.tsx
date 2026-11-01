import { CreditLink } from "./creditLink";

export function KuwaharaFilterCredits() {
  return (
    <p className="py-1.5 leading-relaxed">
      Based on{" "}
      <CreditLink href="https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/">
        On Crafting Painterly Shaders
      </CreditLink>{" "}
      by Maxime Heckel.
    </p>
  );
}
