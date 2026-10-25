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
import downsampleShader from "@/shaders/kuwahara/downsample.glsl";

// Target pixels per CSS pixel
// 1 = CSS size
// 2 = device size
const PAINT_RESOLUTION_SCALE = 1;
const BLUR_DOWNSCALE = 2;

export default class KuwaharaEffect extends Effect {
  private texelSize: Uniform<Vector2>;
  private sceneTarget: WebGLRenderTarget;
  private downsamplePass: ShaderPass;

  private tensorTarget: WebGLRenderTarget;
  private tensorPass: ShaderPass;

  private blurTexelSize: Uniform<Vector2>;
  private blurredAcrossTarget: WebGLRenderTarget;
  private blurredTarget: WebGLRenderTarget;
  private blurAcross: ShaderPass;
  private blurDown: ShaderPass;

  private paintedTarget: WebGLRenderTarget;
  private brushPass: ShaderPass;

  constructor() {
    const pixelRatio = new Uniform(PAINT_RESOLUTION_SCALE);
    const texelSize = new Uniform(new Vector2(1, 1));

    const tensorTarget = makeTarget();
    const blurredTarget = makeTarget();
    const paintedTarget = makeTarget();

    super("KuwaharaEffect", fragmentShader, {
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: new Map<string, Uniform>([
        ["tPainted", new Uniform(paintedTarget.texture)],
      ]),
    });

    const sigma = new Uniform(3);
    const blurTexelSize = new Uniform(new Vector2(1, 1));
    const blurPixelRatio = new Uniform(PAINT_RESOLUTION_SCALE / BLUR_DOWNSCALE);
    this.blurTexelSize = blurTexelSize;
    this.blurredAcrossTarget = makeTarget();
    this.blurredTarget = blurredTarget;
    this.blurAcross = makePass(blurShader, {
      uTexelSize: blurTexelSize,
      uPixelRatio: blurPixelRatio,
      uDirection: { value: new Vector2(1, 0) },
      uSigma: sigma,
    });
    this.blurDown = makePass(blurShader, {
      uTexelSize: blurTexelSize,
      uPixelRatio: blurPixelRatio,
      uDirection: { value: new Vector2(0, 1) },
      uSigma: sigma,
    });

    this.paintedTarget = paintedTarget;
    this.brushPass = makePass(brushShader, {
      uTexelSize: texelSize,
      uPixelRatio: pixelRatio,
      uBrushRadius: { value: 14 },
      tTensor: { value: blurredTarget.texture },
      uAlpha: { value: 1 },
    });

    this.texelSize = texelSize;
    this.tensorTarget = tensorTarget;
    this.tensorPass = makePass(tensorShader, { uTexelSize: texelSize });

    this.sceneTarget = makeTarget();
    this.downsamplePass = makePass(downsampleShader, {
      uTexelSize: texelSize,
    });
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

    this.sceneTarget.setSize(width, height);
    this.tensorTarget.setSize(width, height);
    this.paintedTarget.setSize(width, height);
    this.texelSize.value.set(1 / width, 1 / height);

    const blurWidth = Math.max(1, Math.round(width / BLUR_DOWNSCALE));
    const blurHeight = Math.max(1, Math.round(height / BLUR_DOWNSCALE));
    this.blurredAcrossTarget.setSize(blurWidth, blurHeight);
    this.blurredTarget.setSize(blurWidth, blurHeight);
    this.blurTexelSize.value.set(1 / blurWidth, 1 / blurHeight);
  }

  update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget) {
    this.resizeTargets(renderer, inputBuffer);

    this.downsamplePass.render(renderer, inputBuffer, this.sceneTarget);
    this.tensorPass.render(renderer, this.sceneTarget, this.tensorTarget);
    this.blurAcross.render(
      renderer,
      this.tensorTarget,
      this.blurredAcrossTarget,
    );
    this.blurDown.render(
      renderer,
      this.blurredAcrossTarget,
      this.blurredTarget,
    );
    this.brushPass.render(renderer, this.sceneTarget, this.paintedTarget);
  }
}
