import Link from "next/link";

import { Experience } from "@/components/experience/experience";
import { GameHud } from "@/components/hud/gameHud";
import { LoadingScreen } from "@/components/ui/loadingScreen/loadingScreen";

export default function Page() {
  return (
    <>
      <Link
        href="/experiments"
        className="absolute top-4 left-4 z-10 underline underline-offset-4 hover:text-orange-500"
      >
        Experiments
      </Link>

      <LoadingScreen />
      <Experience />
      <GameHud />
    </>
  );
}
