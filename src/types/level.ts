import type { Graph } from "./graph";
import type { LanternFaceParams } from "./lantern";

export type CostumePiece = "hat" | "cape" | "wings";
export type PumpkinVariant = "classic" | "cheerful" | "happy";

export type PumpkinSettings = {
  variant: PumpkinVariant;
  faceParams: LanternFaceParams;
};

export type Level = {
  piece: CostumePiece;
  title: string;
  graph: Graph;
  pumpkin: PumpkinSettings;
};
