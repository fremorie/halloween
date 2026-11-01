import { dosis } from "@/components/ui/fonts/fonts";
import { GithubIcon } from "@/components/ui/svgs/github";

const REPOSITORY_URL = "https://github.com/fremorie/halloween";

export function GithubLink() {
  return (
    <a
      href={REPOSITORY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${dosis.className} mt-3 flex w-fit items-center gap-2 text-sm font-bold tracking-widest text-neutral-900 uppercase decoration-2 underline-offset-4 outline-offset-4 hover:underline focus-visible:outline-2`}
    >
      <GithubIcon />
      View source code
    </a>
  );
}
