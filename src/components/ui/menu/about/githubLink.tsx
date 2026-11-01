import { GithubIcon } from "@/components/ui/svgs/github";

const REPOSITORY_URL = "https://github.com/fremorie/halloween";

export function GithubLink() {
  return (
    <a
      href={REPOSITORY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-fit items-center gap-2 underline decoration-1 underline-offset-2 outline-offset-2 hover:decoration-2 focus-visible:outline-2"
    >
      <GithubIcon />
      Source code on GitHub
    </a>
  );
}
