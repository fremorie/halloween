import { Uniform, Vector2 } from "three";
import { Effect } from "postprocessing";

import fragmentShader from "@/shaders/colorGrade/fragment.glsl";

export default class ColorGradeEffect extends Effect {
  constructor() {
    super("ColorGradeEffect", fragmentShader, {
      uniforms: new Map<string, Uniform>([
        ["uToneLevels", new Uniform(16)],
        ["uBrightnessRange", new Uniform(new Vector2(0.2, 0.7))],
        ["uDarkestTone", new Uniform(0.1)],
        ["uSaturation", new Uniform(1.5)],
      ]),
    });
  }
}
