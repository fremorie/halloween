import { Section } from "@/components/ui/section/section";
import { ArrowIcon, type ArrowDirection } from "@/components/ui/svgs/arrow";
import { KeyCap } from "@/components/ui/keyCap/keyCap";

const ARROW_DIRECTIONS: ArrowDirection[] = ["left", "up", "down", "right"];

export function HowToPlay() {
  return (
    <div className="flex flex-col gap-5 text-lg">
      <Section title="Move">
        <p>
          {ARROW_DIRECTIONS.map((direction) => (
            <KeyCap key={direction}>
              <ArrowIcon
                direction={direction}
                className="inline-block size-4 align-[-0.2em]"
              />
            </KeyCap>
          ))}{" "}
          or <KeyCap>W</KeyCap>
          <KeyCap>A</KeyCap>
          <KeyCap>S</KeyCap>
          <KeyCap>D</KeyCap> or use the joystick on a touchscreen.
        </p>
      </Section>
      <Section title="Start a puzzle">
        <p>
          Walk up to a pedestal and press <KeyCap>E</KeyCap>, or click Start.
        </p>
      </Section>
      <Section title="Solve it">
        <p>
          Click a yarn ball to start threading, then visit every edge exactly{" "}
          <b>once</b>.
        </p>
        <p>
          Stuck? Press <KeyCap>Esc</KeyCap> or click Reset to cut the thread and
          try again.
        </p>
      </Section>
    </div>
  );
}
