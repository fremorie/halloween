import { Tabs } from "radix-ui";

import { CreditsTabTrigger } from "./creditsTabTrigger";
import { FontCredits } from "./fontCredits";
import { KuwaharaFilterCredits } from "./kuwaharaFilterCredits";
import { SoundCredits } from "./soundCredits";

const CREDITS_TAB_CONTENT_CLASS_NAME = "text-base outline-none";

export function Credits() {
  return (
    <Tabs.Root defaultValue="kuwaharaFilter" className="flex flex-col gap-4">
      <Tabs.List
        aria-label="Credits"
        className="flex flex-wrap gap-x-5 gap-y-1"
      >
        <CreditsTabTrigger value="kuwaharaFilter" label="Kuwahara filter" />
        <CreditsTabTrigger value="fonts" label="Fonts" />
        <CreditsTabTrigger value="sound" label="Sound" />
      </Tabs.List>
      <Tabs.Content
        value="kuwaharaFilter"
        className={CREDITS_TAB_CONTENT_CLASS_NAME}
      >
        <KuwaharaFilterCredits />
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
