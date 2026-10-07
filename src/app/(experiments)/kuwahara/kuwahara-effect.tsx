import { Effect, EffectAttribute } from "postprocessing";
import { Uniform, type WebGLRenderer } from "three";

import fragmentShader from "@/shaders/kuwahara/fragment.glsl";

export default class KuwaharaEffect extends Effect {
  constructor() {
    super("KuwaharaEffect", fragmentShader, {
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: new Map([["uPixelRatio", new Uniform(1)]]),
    });
  }

  update(renderer: WebGLRenderer) {
    this.uniforms.get("uPixelRatio")!.value = renderer.getPixelRatio();
  }
}
