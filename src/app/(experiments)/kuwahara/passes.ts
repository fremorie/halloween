import {
  HalfFloatType,
  ShaderMaterial,
  WebGLRenderTarget,
  type IUniform,
} from "three";
import { ShaderPass } from "postprocessing";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export function makePass(
  fragmentShader: string,
  uniforms: Record<string, IUniform>,
) {
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: { inputBuffer: { value: null }, ...uniforms },
    depthTest: false,
    depthWrite: false,
  });
  return new ShaderPass(material);
}

export function makeTarget() {
  return new WebGLRenderTarget(1, 1, {
    type: HalfFloatType,
    depthBuffer: false,
  });
}
