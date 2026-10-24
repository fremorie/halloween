import Link from "next/link";

import { Game } from "@/components/game/game";

const DEBUG = false;

export default function Page() {
  return (
    <>
      {DEBUG && (
        <Link
          href="/experiments"
          className="absolute top-4 left-4 z-10 underline underline-offset-4 hover:text-orange-500"
        >
          Experiments
        </Link>
      )}

      <Game />
    </>
  );
}
