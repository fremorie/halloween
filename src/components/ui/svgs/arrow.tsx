export type ArrowDirection = "up" | "left" | "down" | "right";

const ARROW_ROTATION: Record<ArrowDirection, string> = {
  left: "0deg",
  up: "90deg",
  right: "180deg",
  down: "-90deg",
};

type ArrowIconProps = {
  direction: ArrowDirection;
  className?: string;
};

export function ArrowIcon({ direction, className }: ArrowIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ rotate: ARROW_ROTATION[direction] }}
      role="img"
      aria-label={direction}
    >
      <path d="M15 10H5M8.5 6.5 5 10l3.5 3.5" />
    </svg>
  );
}
