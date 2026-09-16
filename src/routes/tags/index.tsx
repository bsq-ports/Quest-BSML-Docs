import { createFileRoute } from "@tanstack/react-router";
import { Link, Text } from "@cloudflare/kumo";
import { sortedTags } from "../../lib/docs";

export const Route = createFileRoute("/tags/")({
  component: TagsIndex,
});

function TagsIndex() {
  const tags = sortedTags();
  return (
    <div className="flex flex-col gap-4">
      <Text variant="heading" as="h1" size="lg">
        All Tags
      </Text>
      <Text variant="secondary">{tags.length} tags</Text>
      <ul className="flex flex-col gap-1">
        {tags.map((t) => (
          <li key={t.name}>
            <Link href={`/tags/${t.name}`}>{t.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
