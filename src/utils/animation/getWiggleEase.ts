import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";

gsap.registerPlugin(CustomEase, CustomWiggle);

type WiggleEase = ReturnType<typeof CustomWiggle.create>;
type WiggleType = NonNullable<
  Parameters<typeof CustomWiggle.create>[1]
>["type"];

const wiggleEases = new Map<string, WiggleEase>();

export function getWiggleEase(
  id: string,
  wiggles: number,
  type: WiggleType = "easeOut",
) {
  const wiggleEase =
    wiggleEases.get(id) ?? CustomWiggle.create(id, { wiggles, type });
  wiggleEases.set(id, wiggleEase);
  return wiggleEase;
}
