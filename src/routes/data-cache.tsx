import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@cloudflare/kumo";
import { DataCacheDefine, DataCacheExample, DataCacheUsage } from "../assets/DataCacheExample";

export const Route = createFileRoute("/data-cache")({
  component: DataCache,
});

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-kumo-line bg-kumo-base p-3 text-sm">
      <code>{children}</code>
    </pre>
  );
}

function DataCache() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Text variant="heading" as="h1" size="lg">
          BSML DataCache
        </Text>
        <Text variant="secondary">Providing data to BSML for images</Text>
      </div>

      <p>
        In the PC version of BSML, you're able to provide resource paths to BSML for
        images. Sadly on the quest version this is a bit harder to do effectively, as
        these resource paths are not really a thing on quest, and there's no current
        proper way to access the included assets from other mods. The solution I've
        provided for this can be found in the BSMLDataCache header, included like so:
      </p>
      <CodeBlock>{'#include "bsml/shared/BSMLDataCache.hpp"'}</CodeBlock>
      <p>
        In this header you'll find a class definition, a register method, and a
        macro. The macro is what we will be focusing on. The macro is pasted here
        for convenience:
      </p>
      <CodeBlock>{DataCacheDefine}</CodeBlock>
      <p>
        This macro functions similarly to a hook, where you define a method right
        after using it. This method lets you return an ArrayW&lt;uint8_t&gt; as data
        for BSML to use for images in your mod.
      </p>

      <p>The macro defined in the DataCache header is used like follows:</p>
      <CodeBlock>{DataCacheExample}</CodeBlock>
      <p>
        It is then important to know your MOD_ID. If you are using the conventional
        tooling this will probably be your mod name, without any spaces (e.g. your
        mod is named Qosmetics Whackers, then your MOD_ID will be
        QosmeticsWhackers). The BSML DataCache saves your data as{" "}
        <code>MOD_ID "_" #identifier</code>. The following src should then be used
        to access that image in BSML: <code>QosmeticsWhackers_exampleImage</code>.
        This will let BSML load the image from your mod's registered data.
      </p>

      <p>Here is an example of how registered data will be used within BSML:</p>
      <CodeBlock>{DataCacheUsage}</CodeBlock>
      <p>
        BSML will now just load that image when you ask for it to be used. Keen
        observers will notice that there is no limitation on cross referencing other
        mods images. If it's really a thing that's requested we can look into
        limiting cross referencing mod images, but I think it's better not to have
        that as that lets us make icons packs or similar things possibly. Advanced
        users may make their own register macros, but I think it's best to stick
        with the one provided.
      </p>
    </div>
  );
}
