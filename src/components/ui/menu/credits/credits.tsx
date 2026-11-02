import { Tabs } from "radix-ui";

import { ArtCredits } from "./artCredits";
import { CreditsTabTrigger } from "./creditsTabTrigger";
import { FontCredits } from "./fontCredits";
import { ReferenceCredits } from "./referenceCredits";
import { SoundCredits } from "./soundCredits";

const CREDITS_TAB_CONTENT_CLASS_NAME = "text-base outline-none";

export function Credits() {
  return (
    <Tabs.Root defaultValue="art" className="flex flex-col gap-4">
      <Tabs.List
        aria-label="Credits"
        className="flex flex-wrap gap-x-5 gap-y-1"
      >
        <CreditsTabTrigger value="art" label="Art" />
        <CreditsTabTrigger value="references" label="References" />
        <CreditsTabTrigger value="fonts" label="Fonts" />
        <CreditsTabTrigger value="sound" label="Sound" />
      </Tabs.List>
      <Tabs.Content value="art" className={CREDITS_TAB_CONTENT_CLASS_NAME}>
        <ArtCredits />
      </Tabs.Content>
      <Tabs.Content
        value="references"
        className={CREDITS_TAB_CONTENT_CLASS_NAME}
      >
        <ReferenceCredits />
      </Tabs.Content>
      <Tabs.Content value="fonts" className={CREDITS_TAB_CONTENT_CLASS_NAME}>
        <FontCredits />
      </Tabs.Content>
      <Tabs.Content value="sound" className={CREDITS_TAB_CONTENT_CLASS_NAME}>
        <SoundCredits />
      </Tabs.Content>
    </Tabs.Root>
  );
}
