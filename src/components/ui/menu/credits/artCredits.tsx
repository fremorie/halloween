import { CreditList } from "./creditList";
import { CreditRow } from "./creditRow";

export function ArtCredits() {
  return (
    <CreditList>
      <CreditRow label="3D Models">Created in Blender</CreditRow>
      <CreditRow label="Textures">Hand-painted in GIMP</CreditRow>
    </CreditList>
  );
}
