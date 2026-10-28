export const LEAVES_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/petal.png`;

export const LEAVES_COUNT = 5000;
export const LEAVES_SPAWN_HEIGHT = 10;
export const LEAVES_GROUND_LEVEL = 0;
export const LEAVES_TIME_SCALE = 0.1;

export const LEAVES_SPAWN_AREA = {
  minimumX: -20,
  maximumX: 20,
  minimumZ: -50,
  maximumZ: 20,
  height: LEAVES_SPAWN_HEIGHT,
};
