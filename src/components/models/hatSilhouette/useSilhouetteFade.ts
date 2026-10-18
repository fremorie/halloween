import type { RefObject } from "react";
import type { MeshBasicMaterial } from "three";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { COSTUME_SILHOUETTE_FADE_DURATION } from "@/settings/journeySettings";

type Props = {
  materialRef: RefObject<MeshBasicMaterial | null>;
  isRevealed: boolean;
};

export function useSilhouetteFade({ materialRef, isRevealed }: Props) {
  useGSAP(() => {
    if (!materialRef.current) {
      return;
    }

    gsap.to(materialRef.current, {
      opacity: isRevealed ? 1 : 0,
      duration: COSTUME_SILHOUETTE_FADE_DURATION,
      ease: "sine.out",
      overwrite: "auto",
    });
  }, [isRevealed]);
}
