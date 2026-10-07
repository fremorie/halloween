import { Effect } from "postprocessing";

import fragmentShader from "@/shaders/kuwahara/fragment.glsl";

export default class KuwaharaEffect extends Effect {
  constructor() {
    super("KuwaharaEffect", fragmentShader);
  }

  update(renderer, inputBuffer, deltaTime) {}
}
