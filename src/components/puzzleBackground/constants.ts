import type { CostumePiece } from "@/types/level";

type PuzzleBackgroundPlacement = {
  centreY: number;
  width: number;
  height: number;
};

export const PUZZLE_BACKGROUND_PLACEMENT_BY_PIECE = {
  hat: { centreY: 2.55, width: 10, height: 8.6 },
  cape: { centreY: 2.45, width: 11.4, height: 8.3 },
  wings: { centreY: 2, width: 11.4, height: 6.8 },
} satisfies Record<CostumePiece, PuzzleBackgroundPlacement>;

export const PUZZLE_BACKGROUND_PEDESTAL_FADE_HEIGHT = 0.4;

export const PUZZLE_BACKGROUND_CENTRE_COLOR = "#ffffff";
export const PUZZLE_BACKGROUND_EDGE_COLOR = "#ffc46b";
