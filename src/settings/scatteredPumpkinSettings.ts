import type { Vec3 } from "@/types/math";

type ScatteredPumpkinPlacement = {
  position: Vec3;
  rotationY: number;
  scale: number;
  brightness: number;
};

export const SCATTERED_PUMPKIN_PLACEMENTS: ScatteredPumpkinPlacement[] = [
  { position: [-7.8, 0, -3.8], rotationY: 0.4, scale: 1.2, brightness: 0.55 },
  { position: [-3.6, 0, -4.2], rotationY: 2.1, scale: 0.75, brightness: 1.5 },
  { position: [7.2, 0, -21.8], rotationY: 4.3, scale: 1.1, brightness: 1.4 },
  { position: [3.9, 0, -21.2], rotationY: 1.2, scale: 0.65, brightness: 0.6 },
  { position: [-4.2, 0, -39.8], rotationY: 5.6, scale: 1.25, brightness: 0.65 },
  { position: [-7.9, 0, -39.5], rotationY: 3.1, scale: 0.8, brightness: 1.45 },
  { position: [2.8, 0, 4], rotationY: 0.9, scale: 0.9, brightness: 1.35 },
  { position: [-2.8, 0, -9], rotationY: 2.7, scale: 1, brightness: 0.5 },
  { position: [3, 0, -27], rotationY: 4.9, scale: 0.7, brightness: 1.25 },
  { position: [2.6, 0, -40], rotationY: 1.8, scale: 0.85, brightness: 0.7 },
];
