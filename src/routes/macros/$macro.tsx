import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@cloudflare/kumo";
import { findMacroByAlias } from "../../lib/docs";
import PropertyList from "../../components/PropertyList";
import BadgeLinkList from "../../components/BadgeLinkList";

export const Route = createFileRoute("/macros/$macro")({
  component: MacroPage,
});

function MacroPage() {
  const { macro } = Route.useParams();
  const docMacro = findMacroByAlias(macro);

  if (!docMacro) {
    return (
      <Text variant="heading" as="h1" size="lg">
        Macro '{macro}' not found
      </Text>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Text variant="heading" as="h1" size="lg">
          {docMacro.name}
        </Text>
        <p>{docMacro.description}</p>
        {docMacro.aliases.length > 1 && (
          <BadgeLinkList
            items={docMacro.aliases.map((a) => ({
              href: `/macros/${a}`,
              label: a,
            }))}
          />
        )}
      </div>
      <PropertyList properties={docMacro.properties} />
    </div>
  );
}
