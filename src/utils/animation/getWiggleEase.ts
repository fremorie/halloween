import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";

gsap.registerPlugin(CustomEase, CustomWiggle);

type WiggleEase = ReturnType<typeof CustomWiggle.create>;

const wiggleEases = new Map<string, WiggleEase>();

export function getWiggleEase(id: string, wiggles: number) {
  const wiggleEase =
    wiggleEases.get(id) ??
    CustomWiggle.create(id, { wiggles, type: "easeOut" });
  wiggleEases.set(id, wiggleEase);
  return wiggleEase;
}
