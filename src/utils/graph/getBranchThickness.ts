import { TOUCH_SCREEN_BRANCH_THICKNESS } from "@/settings/graphSettings";
import { isTouchScreen } from "@/utils/isTouchScreen";

export function getBranchThickness() {
  return isTouchScreen() ? TOUCH_SCREEN_BRANCH_THICKNESS : 1;
}
