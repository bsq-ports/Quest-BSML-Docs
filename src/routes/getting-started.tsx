import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@cloudflare/kumo";
import { BSML } from "../assets/BSML";
import {
  HotReloadViewControllerHeader,
  HotReloadViewControllerSource,
} from "../assets/HotReloadViewController";
import { ViewExample } from "../assets/ViewExample";

export const Route = createFileRoute("/getting-started")({
  component: GettingStarted,
});

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-kumo-line bg-kumo-base p-3 text-sm">
      <code>{children}</code>
    </pre>
  );
}

function GettingStarted() {
  return (
    <div className="flex flex-col gap-6">
      <Text variant="heading" as="h1" size="lg">
        Getting Started
      </Text>
      <p>
        This page assumes you already know how to work with custom types, and how to
        compile a mod for quest. It will not be explaining the process of creating a
        mod. Make sure that you are able to compile a mod and put it on your quest.
        It also assumes you are working with QuestUI for registering elements to the
        correct places. With that out of the way, let's get started.
      </p>

      <Text variant="heading" as="h2">
        Adding the dependency
      </Text>
      <p>
        Obviously, this is one of the steps you likely already know how to do, but
        I'll go over it anyways. To add the dependency, you simply run the following
        command in your project:
      </p>
      <CodeBlock>{"qpm dependency add \"bsml\""}</CodeBlock>
      <p>
        This will add the dependency to your project, don't forget to restore so
        your dependencies are updated!
      </p>

      <Text variant="heading" as="h2">
        Using the library
      </Text>
      <p>
        Now that you have the library usable in your mod, you can start using it.
        It's as easy as adding the include to your view controller:
      </p>
      <CodeBlock>{'#include "bsml/shared/BSML.hpp"'}</CodeBlock>
      <p>
        Within this header, you will find a few methods that will prove useful for
        you. These methods are as follows:
      </p>
      <CodeBlock>{BSML}</CodeBlock>
      <p>
        The Init method just initializes BSML so that hooks it needs are installed
        and types are registered, though the other methods implicitly call this too.
        The parse method parses a given string view of a BSML file, and returns the
        BSMLParser generated from this. The UI has not been built yet at this point!
        To build the UI at this point, you still need to call Construct on the given
        parser, and pass it your host object and parent transform. The
        parse_and_construct method does nearly the same thing as the parse method,
        except it also constructs the UI. It'll still return the created BSMLParser
        though, meaning you can afterwards do whatever you want still.
      </p>

      <Text variant="heading" as="h2">
        HotReloadViewController
      </Text>
      <p>
        Like the PC library, the quest version has the hot reload view controller
        base type. This base class can be used to create a view controller that
        watches a file path for changes, and if you change the file, it will
        regenerate the UI. This is especially useful if you quickly need to iterate
        your UI design and want to test out a bunch of changes. It's not quite
        recommended to keep using this base type as it does cause some performance
        overhead, but it's better than not having it. To use this, when declaring
        your View Controller for use with QuestUI, you need to change a few things,
        most notably, you need to declare your class as inheriting a custom type, as
        well as defining the <code>Awake</code> method.
      </p>
      <CodeBlock>{HotReloadViewControllerHeader}</CodeBlock>
      <p>
        In the source Awake method, you can then set the filepath for the file that
        contains your BSML layout:
      </p>
      <CodeBlock>{HotReloadViewControllerSource}</CodeBlock>
      <p>
        Then updating the view is as simple as pushing the file to your quest and
        waiting a bit. The file checker checks every 10 seconds for changes in the
        file, though this is configurable via fileWatcher-&gt;checkInterval. Just run
        the following command to change the view on your quest, and the view should
        update with your new layout:
      </p>
      <CodeBlock>{"adb push ./testview.bsml /sdcard/testview.bsml"}</CodeBlock>
      <p>Obviously this file and location is an example, you can change it for yourself.</p>

      <Text variant="heading" as="h2">
        Creating a View
      </Text>
      <p>
        To create a view I recommend using your favourite XML editor (or just
        installing a VSCode extension for it) and using the asset include cmake
        script to automatically include your view in your mod .so file when you
        compile. This way you can immediately just pass the value to BSML when you
        need it by just including the assets header and passing the value to the
        parse method from BSML.hpp. The first tag in a view can just be a{" "}
        <code>&lt;bg&gt;</code> tag, and the others can be whatever you want. Though
        you can also use any other tag as a root tag. If you add the xml schema from
        the docs here to your XML it should also auto complete all the values for
        you, making usage extremely simple and easy to understand as usable values
        should be auto completed for you. Here is a simple example of a view:
      </p>
      <CodeBlock>{ViewExample}</CodeBlock>
      <img
        src={`${import.meta.env.BASE_URL}Example.jpg`}
        alt="Built view from example"
        className="rounded-lg border border-kumo-line"
      />
    </div>
  );
}
