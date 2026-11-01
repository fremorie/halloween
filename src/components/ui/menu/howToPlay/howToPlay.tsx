import { Section } from "@/components/ui/section/section";
import { KeyCap } from "./keyCap";

export function HowToPlay() {
  return (
    <div className="flex flex-col gap-5 text-lg">
      <Section title="Move">
        <p>
          <KeyCap>←</KeyCap>
          <KeyCap>↑</KeyCap>
          <KeyCap>↓</KeyCap>
          <KeyCap>→</KeyCap> or <KeyCap>W</KeyCap>
          <KeyCap>A</KeyCap>
          <KeyCap>S</KeyCap>
          <KeyCap>D</KeyCap>. On a touch screen, use the joystick.
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
