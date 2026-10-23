import { INTRO_LINES } from "@/settings/introSettings";

export function Content() {
  return (
    <>
      <p>{INTRO_LINES.complain}</p>
      <p>{INTRO_LINES.askForHelp}</p>
    </>
  );
}
