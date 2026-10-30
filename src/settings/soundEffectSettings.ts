export const MEOW_SOUND_SOURCE = `${process.env.NEXT_PUBLIC_BASE_PATH}/sound/meow.mp3`;
export const MEOW_SOUND_VOLUME = 0.6;
export const KNITTING_SOUND_SOURCE = `${process.env.NEXT_PUBLIC_BASE_PATH}/sound/magic-spell.mp3`;
export const KNITTING_SOUND_VOLUME = 0.5;
export const FOOTSTEPS_SOUND_SOURCE = `${process.env.NEXT_PUBLIC_BASE_PATH}/sound/footsteps.mp3`;
export const FOOTSTEPS_SOUND_VOLUME = 1.5;
export const FOOTSTEPS_MIN_WALK_PACE = 0.1;
export const FOOTSTEPS_SOUND_PLAYBACK_RATE = 1.5;
export const CAPE_SOUND_SOURCE = `${process.env.NEXT_PUBLIC_BASE_PATH}/sound/cape.mp3`;
export const CAPE_SOUND_VOLUME = 0.8;
export const BIRDS_SOUND_SOURCE = `${process.env.NEXT_PUBLIC_BASE_PATH}/sound/birds.mp3`;
export const BIRDS_SOUND_VOLUME = 0.03;
export const BIRDS_SOUND_FADE_IN_DURATION_IN_SECONDS = 6;
export const WHOOSH_SOUND_SOURCE = `${process.env.NEXT_PUBLIC_BASE_PATH}/sound/whoosh.mp3`;
export const WHOOSH_SOUND_VOLUME = 0.1;
export const SEWING_MACHINE_SOUND_SOURCE = `${process.env.NEXT_PUBLIC_BASE_PATH}/sound/sewing-machine.mp3`;
export const SEWING_MACHINE_SOUND_VOLUME = 0.8;
export const SEWING_MACHINE_PITCH_RISE_IN_SEMITONES = 12;
export const WING_FLAP_SOUND_SOURCE = `${process.env.NEXT_PUBLIC_BASE_PATH}/sound/wing-flap.mp3`;
export const WING_FLAP_SOUND_VOLUME = 0.6;
export const WING_FLAP_SOUND_PLAYBACK_RATE = 1;
export const WING_FLAP_SOUND_SPRITES: Record<string, [number, number]> = {
  wingFlap1: [100, 700],
  wingFlap2: [900, 700],
  wingFlap3: [1700, 700],
  wingFlap4: [2500, 700],
};
export const WING_FLAP_SOUND_PEAK_OFFSET_IN_SECONDS = 0.2;
export const WING_FLAP_SOUND_PEAK_PHASE = 0.35;
