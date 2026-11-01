import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";
import type { Group } from "three";

import {
  COSTUME_PIECE_DROP_DURATION,
  COSTUME_PIECE_DROP_HEIGHT,
} from "@/settings/rewardSettings";

export function useCostumePieceDrop(
  costumePieceGroupRef: RefObject<Group | null>,
  isWorn: boolean,
) {
  useGSAP(() => {
    const costumePieceGroup = costumePieceGroupRef.current;
    if (!isWorn || !costumePieceGroup) return;

    gsap.from(costumePieceGroup.position, {
      y: COSTUME_PIECE_DROP_HEIGHT,
      duration: COSTUME_PIECE_DROP_DURATION,
      ease: "bounce.out",
    });
  }, [isWorn]);
}
