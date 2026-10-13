import type { Graph } from "./graph";

export type CostumePiece = "hat" | "cape" | "wings";
export type PumpkinVariant = "classic" | "cheerful" | "happy";

export type Level = {
  piece: CostumePiece;
  title: string;
  graph: Graph;
  pumpkin: PumpkinVariant;
};
