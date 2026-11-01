import { Dialog } from "radix-ui";

import { GithubLink } from "./githubLink";

export function About() {
  return (
    <div className="flex flex-col gap-3 text-lg leading-relaxed">
      <Dialog.Description>
        Marcelino is a cat, and like any respectable cat, he needs a Halloween
        costume. Obviously.
      </Dialog.Description>
      <p>
        Walk around, solve a puzzle at each pedestal and summon the costume
        piece by piece. Help Marcelino get ready for trick-or-treating before
        Halloween night!
      </p>
      <GithubLink />
    </div>
  );
}
