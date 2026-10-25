import {
  Color,
  Uniform,
  Vector2,
  type WebGLRenderer,
  type WebGLRenderTarget,
} from "three";
import { Effect, type ShaderPass } from "postprocessing";

import { makePass, makeTarget } from "./passes";
import fragmentShader from "@/shaders/paper/fragment.glsl";
import grainShader from "@/shaders/paper/grain.glsl";

export default class PaperEffect extends Effect {
  private grainTarget: WebGLRenderTarget;
  private grainPass: ShaderPass;
  private grainResolution: Uniform<Vector2>;
  private grainPixelRatio: Uniform<number>;
  private bakedPixelRatio = 0;

  constructor() {
    const grainTarget = makeTarget();

    super("PaperEffect", fragmentShader, {
      uniforms: new Map<string, Uniform>([
        ["tGrain", new Uniform(grainTarget.texture)],
        ["uPaperColor", new Uniform(new Color("#f3ecdf"))],
        ["uGrainStrength", new Uniform(0.15)],
      ]),
    });

    this.grainTarget = grainTarget;
    this.grainResolution = new Uniform(new Vector2(1, 1));
    this.grainPixelRatio = new Uniform(1);
    this.grainPass = makePass(grainShader, {
      uResolution: this.grainResolution,
      uPixelRatio: this.grainPixelRatio,
    });
  }

  update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget) {
    const pixelRatio = renderer.getPixelRatio();
    const { width, height } = inputBuffer;
    const target = this.grainTarget;

    const isBakeUpToDate =
      target.width === width &&
      target.height === height &&
      this.bakedPixelRatio === pixelRatio;
    if (isBakeUpToDate) return;

    target.setSize(width, height);
    this.grainResolution.value.set(width, height);
    this.grainPixelRatio.value = pixelRatio;
    this.bakedPixelRatio = pixelRatio;

    this.grainPass.render(renderer, inputBuffer, target);
  }
}
