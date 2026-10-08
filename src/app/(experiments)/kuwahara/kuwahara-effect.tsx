import { Effect, EffectAttribute, type ShaderPass } from "postprocessing";
import {
  Uniform,
  Vector2,
  type WebGLRenderer,
  type WebGLRenderTarget,
} from "three";

import { makePass, makeTarget } from "./passes";
import fragmentShader from "@/shaders/kuwahara/fragment.glsl";
import tensorShader from "@/shaders/kuwahara/tensor.glsl";
import blurShader from "@/shaders/kuwahara/blur.glsl";

export default class KuwaharaEffect extends Effect {
  private pixelRatio: Uniform<number>;
  private texelSize: Uniform<Vector2>;
  private tensorTarget: WebGLRenderTarget;
  private tensorPass: ShaderPass;

  private blurredTarget: WebGLRenderTarget;
  private blurAcross: ShaderPass;
  private blurDown: ShaderPass;

  constructor() {
    const pixelRatio = new Uniform(1);
    const texelSize = new Uniform(new Vector2(1, 1));
    const tensorTarget = makeTarget();

    super("KuwaharaEffect", fragmentShader, {
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: new Map<string, Uniform>([
        ["uPixelRatio", pixelRatio],
        ["uBrushRadius", new Uniform(14)],
        ["tTensor", new Uniform(tensorTarget.texture)],
        ["uAlpha", new Uniform(1)],
      ]),
    });

    const sigma = new Uniform(3);
    this.blurredTarget = makeTarget();
    this.blurAcross = makePass(blurShader, {
      uTexelSize: texelSize,
      uPixelRatio: pixelRatio,
      uDirection: { value: new Vector2(1, 0) },
      uSigma: sigma,
    });
    this.blurDown = makePass(blurShader, {
      uTexelSize: texelSize,
      uPixelRatio: pixelRatio,
      uDirection: { value: new Vector2(0, 1) },
      uSigma: sigma,
    });

    this.pixelRatio = pixelRatio;
    this.texelSize = texelSize;
    this.tensorTarget = tensorTarget;
    this.tensorPass = makePass(tensorShader, { uTexelSize: texelSize });
  }

  setSize(width: number, height: number) {
    this.tensorTarget.setSize(width, height);
    this.blurredTarget.setSize(width, height);
    this.texelSize.value.set(1 / width, 1 / height);
  }

  update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget) {
    this.pixelRatio.value = renderer.getPixelRatio();
    this.tensorPass.render(renderer, inputBuffer, this.tensorTarget);

    this.blurAcross.render(renderer, this.tensorTarget, this.blurredTarget);
    this.blurDown.render(renderer, this.blurredTarget, this.tensorTarget);
  }
}
