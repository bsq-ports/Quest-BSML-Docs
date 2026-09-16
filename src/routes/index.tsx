import { createFileRoute } from "@tanstack/react-router";
import { Link, Text } from "@cloudflare/kumo";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Text variant="heading" as="h1" size="lg">
        Quest BSML Docs
      </Text>
      <p>
        Welcome to the BSML Docs for the quest version!
        <br />
        If you're new here, you should start by taking a look at{" "}
        <Link href="/getting-started">Getting Started</Link>.
        <br />
        If you are just looking to use the library, you can take a look at{" "}
        <Link href="/tags">the tags</Link> available in the library.
      </p>
    </div>
  );
}
