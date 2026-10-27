import { Howl } from "howler";

import {
  MEOW_SOUND_SOURCE,
  MEOW_SOUND_VOLUME,
} from "@/settings/soundEffectSettings";

let meowSound: Howl | null = null;

export function getMeowSound() {
  if (meowSound === null || meowSound === undefined) {
    meowSound = new Howl({
      src: [MEOW_SOUND_SOURCE],
      volume: MEOW_SOUND_VOLUME,
    });
  }
  return meowSound;
}
