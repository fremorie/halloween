import { JackOLanternHappyModel } from "@/components/models/jackOLanternHappy/jackOLanternHappyModel";
import type { LanternFaceParams } from "@/types/lantern";

type Props = {
  faceParams: LanternFaceParams;
};

export function JackOLantern({ faceParams }: Props) {
  return <JackOLanternHappyModel faceParams={faceParams} />;
}
