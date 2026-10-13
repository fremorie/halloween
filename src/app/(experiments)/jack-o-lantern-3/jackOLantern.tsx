import { JackOLanternCheerfulModel } from "@/components/models/jackOLanternCheerful/jackOLanternCheerfulModel";
import type { LanternFaceParams } from "@/types/lantern";

type Props = {
  faceParams: LanternFaceParams;
};

export function JackOLantern({ faceParams }: Props) {
  return <JackOLanternCheerfulModel faceParams={faceParams} />;
}
