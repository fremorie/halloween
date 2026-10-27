import { BrushStroke } from "@/components/ui/textBox/brushStroke";

type ArrowDirection = "up" | "left" | "down" | "right";

const ARROW_ROTATION: Record<ArrowDirection, string> = {
  left: "0deg",
  up: "90deg",
  right: "180deg",
  down: "-90deg",
};

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
      <svg
        viewBox="0 0 20 20"
        width={16}
        height={16}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative text-white"
        style={{ rotate: ARROW_ROTATION[direction] }}
        role="img"
        aria-label={direction}
      >
        <path d="M15 10H5M8.5 6.5 5 10l3.5 3.5" />
      </svg>
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
