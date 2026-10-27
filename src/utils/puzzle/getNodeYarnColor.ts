import { YARN_PALETTE } from "@/settings/yarnPalette";

export function getNodeYarnColor(nodeId: number) {
  return YARN_PALETTE[nodeId % YARN_PALETTE.length];
}
