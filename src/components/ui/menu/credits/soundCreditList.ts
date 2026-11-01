export const SOUND_LICENSES = {
  pixabay: {
    name: "Pixabay License",
    url: "https://pixabay.com/service/license-summary/",
  },
  creativeCommonsZero: {
    name: "CC0",
    url: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  creativeCommonsAttribution: {
    name: "CC BY 3.0",
    url: "https://creativecommons.org/licenses/by/3.0/",
  },
};

export type SoundLicense = (typeof SOUND_LICENSES)[keyof typeof SOUND_LICENSES];

export type SoundCredit = {
  sound: string;
  track: string;
  trackUrl: string;
  author: string;
  license: SoundLicense;
};

export const SOUND_CREDITS: SoundCredit[] = [
  {
    sound: "Meow",
    track: "Cute Cat",
    trackUrl: "https://pixabay.com/sound-effects/nature-cute-cat-352656/",
    author: "Stu9",
    license: SOUND_LICENSES.pixabay,
  },
  {
    sound: "Magic spell",
    track: "Mystical Wind Chimes Transition FX",
    trackUrl:
      "https://pixabay.com/sound-effects/film-special-effects-mystical-wind-chimes-transition-fx-6327/",
    author: "djlprojects",
    license: SOUND_LICENSES.pixabay,
  },
  {
    sound: "Footsteps",
    track: "Animal Footsteps",
    trackUrl: "https://freesound.org/s/658429/",
    author: "IENBA",
    license: SOUND_LICENSES.creativeCommonsZero,
  },
  {
    sound: "Cape",
    track: "Clothes drop 2",
    trackUrl:
      "https://pixabay.com/sound-effects/household-clothes-drop-2-40202/",
    author: "ZoviPoland",
    license: SOUND_LICENSES.pixabay,
  },
  {
    sound: "Whoosh",
    track: "Cinematic Whoosh 3",
    trackUrl: "https://pixabay.com/sound-effects/cinematic-whoosh-3-467473/",
    author: "DRAGON-STUDIO",
    license: SOUND_LICENSES.pixabay,
  },
  {
    sound: "Birds",
    track: "Early_morning_birds_04.mp3",
    trackUrl: "https://freesound.org/s/511758/",
    author: "aladar",
    license: SOUND_LICENSES.creativeCommonsAttribution,
  },
  {
    sound: "Knitting",
    track: "Echo Chime Chime",
    trackUrl:
      "https://pixabay.com/sound-effects/musical-echo-chime-chime-89653/",
    author: "husky70",
    license: SOUND_LICENSES.pixabay,
  },
  {
    sound: "Sewing machine",
    track: "028693_sewing machine",
    trackUrl:
      "https://pixabay.com/sound-effects/household-028693-sewing-machine-75851/",
    author: "freesound_community",
    license: SOUND_LICENSES.pixabay,
  },
  {
    sound: "Wing flaps",
    track: "Heavy Wings Flapping",
    trackUrl:
      "https://pixabay.com/sound-effects/film-special-effects-heavy-wings-flapping-364607/",
    author: "DRAGON-STUDIO",
    license: SOUND_LICENSES.pixabay,
  },
  {
    sound: "Purr",
    track: "Cat Perfect Purr",
    trackUrl:
      "https://pixabay.com/sound-effects/nature-cat-perfect-purr-54580/",
    author: "cristinaadrn",
    license: SOUND_LICENSES.pixabay,
  },
];
