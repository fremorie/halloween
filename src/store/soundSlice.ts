import { Howl } from "howler";
import type { StateCreator } from "zustand";

import type { GameState } from "@/store/gameStore";
import { THEME_MUSIC_SOURCE } from "@/settings/musicSettings";
import {
  FOOTSTEPS_SOUND_PLAYBACK_RATE,
  FOOTSTEPS_SOUND_SOURCE,
  FOOTSTEPS_SOUND_VOLUME,
  MAGIC_SPELL_SOUND_SOURCE,
  MAGIC_SPELL_SOUND_VOLUME,
  MEOW_SOUND_SOURCE,
  MEOW_SOUND_VOLUME,
} from "@/settings/soundEffectSettings";

export type SoundSlice = {
  themeMusic: Howl | null;
  meowSound: Howl | null;
  magicSpellSound: Howl | null;
  footstepsSound: Howl | null;
  loadSounds: () => void;
};

export const createSoundSlice: StateCreator<GameState, [], [], SoundSlice> = (
  set,
  get,
) => ({
  themeMusic: null,
  meowSound: null,
  magicSpellSound: null,
  footstepsSound: null,

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
      magicSpellSound: new Howl({
        src: [MAGIC_SPELL_SOUND_SOURCE],
        volume: MAGIC_SPELL_SOUND_VOLUME,
      }),
      footstepsSound: new Howl({
        src: [FOOTSTEPS_SOUND_SOURCE],
        loop: true,
        volume: FOOTSTEPS_SOUND_VOLUME,
        rate: FOOTSTEPS_SOUND_PLAYBACK_RATE,
      }),
    });
  },
});
