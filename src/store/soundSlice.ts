import { Howl } from "howler";
import type { StateCreator } from "zustand";

import type { GameState } from "@/store/gameStore";
import { THEME_MUSIC_SOURCE } from "@/settings/musicSettings";
import {
  CAPE_SOUND_SOURCE,
  CAPE_SOUND_VOLUME,
  FOOTSTEPS_SOUND_PLAYBACK_RATE,
  FOOTSTEPS_SOUND_SOURCE,
  FOOTSTEPS_SOUND_VOLUME,
  KNITTING_SOUND_SOURCE,
  KNITTING_SOUND_VOLUME,
  MEOW_SOUND_SOURCE,
  MEOW_SOUND_VOLUME,
} from "@/settings/soundEffectSettings";

export type SoundSlice = {
  themeMusic: Howl | null;
  meowSound: Howl | null;
  knittingSound: Howl | null;
  footstepsSound: Howl | null;
  capeSound: Howl | null;
  loadSounds: () => void;
};

export const createSoundSlice: StateCreator<GameState, [], [], SoundSlice> = (
  set,
  get,
) => ({
  themeMusic: null,
  meowSound: null,
  knittingSound: null,
  footstepsSound: null,
  capeSound: null,

  loadSounds: () => {
    if (get().themeMusic !== null) {
      return;
    }

    set({
      themeMusic: new Howl({
        src: [THEME_MUSIC_SOURCE],
        loop: true,
        volume: 0,
      }),
      meowSound: new Howl({
        src: [MEOW_SOUND_SOURCE],
        volume: MEOW_SOUND_VOLUME,
      }),
      knittingSound: new Howl({
        src: [KNITTING_SOUND_SOURCE],
        volume: KNITTING_SOUND_VOLUME,
      }),
      footstepsSound: new Howl({
        src: [FOOTSTEPS_SOUND_SOURCE],
        loop: true,
        volume: FOOTSTEPS_SOUND_VOLUME,
        rate: FOOTSTEPS_SOUND_PLAYBACK_RATE,
      }),
      capeSound: new Howl({
        src: [CAPE_SOUND_SOURCE],
        volume: CAPE_SOUND_VOLUME,
      }),
    });
  },
});
