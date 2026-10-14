import { Color } from "three";

export function toGrayscale(color: Color) {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
  return new Color().setScalar(luminance);
}
