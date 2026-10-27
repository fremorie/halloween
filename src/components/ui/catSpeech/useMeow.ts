import { useEffect } from "react";

import { getMeowSound } from "@/utils/audio";

export function useMeow(spokenText: string) {
  useEffect(() => {
    const meowSound = getMeowSound();
    const meowSoundId = meowSound.play();
    return () => {
      meowSound.stop(meowSoundId);
    };
  }, [spokenText]);
}
