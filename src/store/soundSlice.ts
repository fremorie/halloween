import { Howl } from "howler";
import type { StateCreator } from "zustand";

import type { GameState } from "@/store/gameStore";
import { THEME_MUSIC_SOURCE } from "@/settings/musicSettings";
import {
  BIRDS_SOUND_SOURCE,
  CAPE_SOUND_SOURCE,
  CAPE_SOUND_VOLUME,
  FOOTSTEPS_SOUND_PLAYBACK_RATE,
  FOOTSTEPS_SOUND_SOURCE,
  FOOTSTEPS_SOUND_VOLUME,
  KNITTING_SOUND_SOURCE,
  KNITTING_SOUND_VOLUME,
  MEOW_SOUND_SOURCE,
  MEOW_SOUND_VOLUME,
  SEWING_MACHINE_SOUND_SOURCE,
  SEWING_MACHINE_SOUND_VOLUME,
  WHOOSH_SOUND_SOURCE,
  WHOOSH_SOUND_VOLUME,
  WING_FLAP_SOUND_PLAYBACK_RATE,
  WING_FLAP_SOUND_SOURCE,
  WING_FLAP_SOUND_SPRITES,
  WING_FLAP_SOUND_VOLUME,
} from "@/settings/soundEffectSettings";

export type SoundSlice = {
  themeMusic: Howl | null;
  meowSound: Howl | null;
  knittingSound: Howl | null;
  footstepsSound: Howl | null;
  capeSound: Howl | null;
  birdsSound: Howl | null;
  whooshSound: Howl | null;
  sewingMachineSound: Howl | null;
  wingFlapSound: Howl | null;
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
  birdsSound: null,
  whooshSound: null,
  sewingMachineSound: null,
  wingFlapSound: null,

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
      birdsSound: new Howl({
        src: [BIRDS_SOUND_SOURCE],
        loop: true,
        volume: 0,
      }),
      whooshSound: new Howl({
        src: [WHOOSH_SOUND_SOURCE],
        volume: WHOOSH_SOUND_VOLUME,
      }),
      sewingMachineSound: new Howl({
        src: [SEWING_MACHINE_SOUND_SOURCE],
        volume: SEWING_MACHINE_SOUND_VOLUME,
      }),
      wingFlapSound: new Howl({
        src: [WING_FLAP_SOUND_SOURCE],
        volume: WING_FLAP_SOUND_VOLUME,
        rate: WING_FLAP_SOUND_PLAYBACK_RATE,
        sprite: WING_FLAP_SOUND_SPRITES,
      }),
    });
  },
});
