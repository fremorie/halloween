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
import brushShader from "@/shaders/kuwahara/brush.glsl";

// Target pixels per CSS pixel
// 1 = CSS size
// 2 = device size
const PAINT_RESOLUTION_SCALE = 1.5;

export default class KuwaharaEffect extends Effect {
  private texelSize: Uniform<Vector2>;
  private tensorTarget: WebGLRenderTarget;
  private tensorPass: ShaderPass;

  private blurredTarget: WebGLRenderTarget;
  private blurAcross: ShaderPass;
  private blurDown: ShaderPass;

  private paintedTarget: WebGLRenderTarget;
  private brushPass: ShaderPass;

  constructor() {
    const pixelRatio = new Uniform(PAINT_RESOLUTION_SCALE);
    const texelSize = new Uniform(new Vector2(1, 1));

    const tensorTarget = makeTarget();
    const paintedTarget = makeTarget();

    super("KuwaharaEffect", fragmentShader, {
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: new Map<string, Uniform>([
        ["tPainted", new Uniform(paintedTarget.texture)],
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

    this.paintedTarget = paintedTarget;
    this.brushPass = makePass(brushShader, {
      uTexelSize: texelSize,
      uPixelRatio: pixelRatio,
      uBrushRadius: { value: 14 },
      tTensor: { value: tensorTarget.texture },
      uAlpha: { value: 1 },
    });

    this.texelSize = texelSize;
    this.tensorTarget = tensorTarget;
    this.tensorPass = makePass(tensorShader, { uTexelSize: texelSize });
  }

  private resizeTargets(
    renderer: WebGLRenderer,
    inputBuffer: WebGLRenderTarget,
  ) {
    const devicePixelsPerCssPixel = renderer.getPixelRatio();
    const width = Math.round(
      (inputBuffer.width / devicePixelsPerCssPixel) * PAINT_RESOLUTION_SCALE,
    );
    const height = Math.round(
      (inputBuffer.height / devicePixelsPerCssPixel) * PAINT_RESOLUTION_SCALE,
    );

    const target = this.paintedTarget;
    if (target.width === width && target.height === height) {
      return;
    }

    this.tensorTarget.setSize(width, height);
    this.blurredTarget.setSize(width, height);
    this.paintedTarget.setSize(width, height);
    this.texelSize.value.set(1 / width, 1 / height);
  }

  update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget) {
    this.resizeTargets(renderer, inputBuffer);

    this.tensorPass.render(renderer, inputBuffer, this.tensorTarget);
    this.blurAcross.render(renderer, this.tensorTarget, this.blurredTarget);
    this.blurDown.render(renderer, this.blurredTarget, this.tensorTarget);
    this.brushPass.render(renderer, inputBuffer, this.paintedTarget);
  }
}
