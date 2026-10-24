import {
  BRANCH_STEM_END_RADIUS,
  BRANCH_TUCK_DISTANCE,
  NODE_RADIUS,
} from "@/settings/graphSettings";
import {
  KNITTING_BALL_COVER_MARGIN,
  VISITED_NODE_SCALE,
} from "@/settings/puzzleSettings";
import { getBranchThickness } from "@/utils/graph";

export function getKnittingBallEndScale() {
  const smallestCoveringRadius =
    Math.hypot(
      BRANCH_TUCK_DISTANCE,
      BRANCH_STEM_END_RADIUS * getBranchThickness(),
    ) * KNITTING_BALL_COVER_MARGIN;

  return smallestCoveringRadius / (NODE_RADIUS * VISITED_NODE_SCALE);
}
