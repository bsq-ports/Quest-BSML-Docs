import { createFileRoute } from "@tanstack/react-router";
import { Link, Text } from "@cloudflare/kumo";
import { findTagByAlias, findComponent } from "../../lib/docs";
import { TagExamples } from "../../assets/Examples";
import PropertyList from "../../components/PropertyList";
import BadgeLinkList from "../../components/BadgeLinkList";

export const Route = createFileRoute("/tags/$tag")({
  component: TagPage,
});

function TagPage() {
  const { tag } = Route.useParams();
  const docTag = findTagByAlias(tag);

  if (!docTag) {
    return (
      <Text variant="heading" as="h1" size="lg">
        Tag '{tag}' not found
      </Text>
    );
  }

  const otherAliases = docTag.aliases.filter((a) => a !== tag);
  const example = TagExamples[docTag.name];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Text variant="heading" as="h1" size="lg">
          {docTag.name}
        </Text>
        {docTag.since && (
          <Text variant="secondary">
            Available since BSML Quest version v{docTag.since}
          </Text>
        )}
        <p>{docTag.description}</p>
        {otherAliases.length > 0 && (
          <BadgeLinkList
            items={otherAliases.map((a) => ({ href: `/tags/${a}`, label: a }))}
          />
        )}
      </div>

      <div className="flex flex-col gap-4">
        {docTag.components
          .slice()
          .sort()
          .map((c) => {
            const component = findComponent(c);
            if (!component) {
              return <div key={c}>Invalid component: {c}</div>;
            }
            return (
              <div
                key={c}
                className="flex flex-col gap-2 rounded-lg border border-kumo-line p-4"
              >
                <Link href={`/components/${component.typename}`} className="font-mono">
                  {component.typename}
                </Link>
                <p className="text-sm text-kumo-subtle">{component.description}</p>
                <PropertyList properties={component.properties} />
              </div>
            );
          })}
      </div>

      {example && (
        <div className="flex flex-col gap-3">
          <Text variant="heading" as="h3">
            Usage Example
          </Text>
          <pre className="overflow-x-auto rounded-md border border-kumo-line bg-kumo-base p-3 text-sm">
            <code>{example.exampleString}</code>
          </pre>
          {example.exampleImage && (
            <img
              src={`/img/${example.exampleImage}`}
              alt={`${docTag.name} in-game result`}
              className="rounded-lg border border-kumo-line"
            />
          )}
        </div>
      )}
    </div>
  );
}
