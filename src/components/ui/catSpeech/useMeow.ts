import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";

export function useMeow(spokenText: string) {
  const meowSound = useGameStore((state) => state.meowSound);

  useEffect(() => {
    if (meowSound === null) return;

    const meowSoundId = meowSound.play();
    return () => {
      meowSound.stop(meowSoundId);
    };
  }, [meowSound, spokenText]);
}
