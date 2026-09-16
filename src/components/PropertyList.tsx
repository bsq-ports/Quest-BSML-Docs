import { Badge } from "@cloudflare/kumo";
import type { DocProperty } from "../lib/docs";

export default function PropertyList({ properties }: { properties: DocProperty[] }) {
  return (
    <div className="flex flex-col gap-3">
      {properties.map((p) => (
        <div
          key={p.key}
          className="flex flex-col gap-1 border-b border-kumo-line pb-3 last:border-0 last:pb-0"
        >
          <div className="flex flex-wrap items-center gap-2">
            {p.aliases.map((a) => (
              <Badge key={a} variant="secondary">
                {a}
              </Badge>
            ))}
            <span className="font-mono text-sm text-kumo-subtle">{p.type}</span>
          </div>
          <p className="text-sm text-kumo-subtle">{p.description}</p>
        </div>
      ))}
    </div>
  );
}
