import { ArrowIcon, type ArrowDirection } from "@/components/ui/svgs/arrow";
import { BrushStroke } from "@/components/ui/textBox/brushStroke";

const ARROW_KEY_GRID_AREA: Record<ArrowDirection, string> = {
  up: "1 / 2",
  left: "2 / 1",
  down: "2 / 2",
  right: "2 / 3",
};

const ARROW_DIRECTIONS: ArrowDirection[] = ["up", "left", "down", "right"];

function ArrowKeyCap({ direction }: { direction: ArrowDirection }) {
  const isVerticalArrow = direction === "up" || direction === "down";

  return (
    <kbd
      style={{ gridArea: ARROW_KEY_GRID_AREA[direction] }}
      className="relative flex size-8 items-center justify-center border-2 border-black bg-background"
    >
      <BrushStroke
        color="purple"
        className={`top-1/2 left-1/2 size-6! -translate-1/2 ${isVerticalArrow ? "rotate-90" : ""}`}
      />
      <ArrowIcon direction={direction} className="relative size-4 text-white" />
    </kbd>
  );
}

export function ArrowKeysImg() {
  return (
    <div className="relative grid grid-cols-[repeat(3,auto)] gap-1">
      {ARROW_DIRECTIONS.map((direction) => (
        <ArrowKeyCap key={direction} direction={direction} />
      ))}
    </div>
  );
}
