import { Color, Uniform, type WebGLRenderer } from "three";
import { Effect } from "postprocessing";

import fragmentShader from "@/shaders/paper/fragment.glsl";

export default class PaperEffect extends Effect {
  constructor() {
    super("PaperEffect", fragmentShader, {
      uniforms: new Map<string, Uniform>([
        ["uPixelRatio", new Uniform(1)],
        ["uPaperColor", new Uniform(new Color("#f3ecdf"))],
        ["uGrainStrength", new Uniform(0.15)],
      ]),
    });
  }

  update(renderer: WebGLRenderer) {
    this.uniforms.get("uPixelRatio")!.value = renderer.getPixelRatio();
  }
}
