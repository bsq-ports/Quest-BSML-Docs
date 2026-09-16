import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@cloudflare/kumo";
import { docs, findComponent } from "../../lib/docs";
import PropertyList from "../../components/PropertyList";
import BadgeLinkList from "../../components/BadgeLinkList";

export const Route = createFileRoute("/components/$component")({
  component: ComponentPage,
});

function ComponentPage() {
  const { component } = Route.useParams();
  const docComponent = findComponent(component);

  if (!docComponent) {
    return (
      <Text variant="heading" as="h1" size="lg">
        Component '{component}' not found
      </Text>
    );
  }

  const usedInTags = docs.tags
    .filter((t) => t.components.includes(docComponent.typename))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Text variant="heading" as="h1" size="lg">
          <span className="font-mono">{docComponent.typename}</span>
        </Text>
        <p>{docComponent.description}</p>
      </div>

      <PropertyList properties={docComponent.properties} />

      {usedInTags.length > 0 && (
        <div className="flex flex-col gap-2">
          <Text variant="heading" as="h3">
            Used in the following tags
          </Text>
          <BadgeLinkList
            items={usedInTags.map((t) => ({ href: `/tags/${t.name}`, label: t.name }))}
          />
        </div>
      )}
    </div>
  );
}
