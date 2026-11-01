import { Tabs } from "radix-ui";

import { About } from "@/components/ui/menu/about/about";
import { Credits } from "@/components/ui/menu/credits/credits";
import { HowToPlay } from "@/components/ui/menu/howToPlay/howToPlay";
import { MenuTabTrigger } from "./menuTabTrigger";

const TAB_CONTENT_CLASS_NAME =
  "max-h-[52vh] overflow-y-auto pr-2 pb-4 outline-none mask-b-from-[calc(100%-1rem)]";

export function MenuTabs() {
  return (
    <Tabs.Root defaultValue="about" className="flex flex-col gap-5">
      <div className="border-b border-neutral-900/25 pb-3">
        <Tabs.List aria-label="Menu" className="-ml-3 flex flex-wrap gap-1">
          <MenuTabTrigger value="about" label="About" />
          <MenuTabTrigger value="howToPlay" label="How to play" />
          <MenuTabTrigger value="credits" label="Credits" />
        </Tabs.List>
      </div>
      <Tabs.Content value="about" className={TAB_CONTENT_CLASS_NAME}>
        <About />
      </Tabs.Content>
      <Tabs.Content value="howToPlay" className={TAB_CONTENT_CLASS_NAME}>
        <HowToPlay />
      </Tabs.Content>
      <Tabs.Content value="credits" className={TAB_CONTENT_CLASS_NAME}>
        <Credits />
      </Tabs.Content>
    </Tabs.Root>
  );
}
