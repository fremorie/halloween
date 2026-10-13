import { JackOLanternModel } from "@/components/models/jackOLantern/jackOLanternModel";
import type { LanternFaceParams } from "@/types/lantern";

type Props = {
  faceParams: LanternFaceParams;
};

export function JackOLantern({ faceParams }: Props) {
  return <JackOLanternModel faceParams={faceParams} />;
}
