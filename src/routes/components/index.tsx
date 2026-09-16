import { createFileRoute } from "@tanstack/react-router";
import { Link, Text } from "@cloudflare/kumo";
import { sortedComponents } from "../../lib/docs";

export const Route = createFileRoute("/components/")({
  component: ComponentsIndex,
});

function ComponentsIndex() {
  const components = sortedComponents();
  return (
    <div className="flex flex-col gap-4">
      <Text variant="heading" as="h1" size="lg">
        All Components
      </Text>
      <Text variant="secondary">{components.length} components</Text>
      <ul className="flex flex-col gap-1">
        {components.map((c) => (
          <li key={c.typename}>
            <Link href={`/components/${c.typename}`} className="font-mono text-sm">
              {c.typename}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
