import { createFileRoute } from "@tanstack/react-router";
import { Link, Text } from "@cloudflare/kumo";
import { sortedMacros } from "../../lib/docs";

export const Route = createFileRoute("/macros/")({
  component: MacrosIndex,
});

function MacrosIndex() {
  const macros = sortedMacros();
  return (
    <div className="flex flex-col gap-4">
      <Text variant="heading" as="h1" size="lg">
        All Macros
      </Text>
      <Text variant="secondary">{macros.length} macros</Text>
      <ul className="flex flex-col gap-1">
        {macros.map((m) => (
          <li key={m.name}>
            <Link href={`/macros/${m.name}`}>{m.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
