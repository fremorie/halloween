import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";

export function useCapeSound(isWorn: boolean) {
  const capeSound = useGameStore((state) => state.capeSound);

  useEffect(() => {
    if (!isWorn || capeSound === null) return;

    const capeSoundId = capeSound.play();
    return () => {
      capeSound.stop(capeSoundId);
    };
  }, [capeSound, isWorn]);
}
