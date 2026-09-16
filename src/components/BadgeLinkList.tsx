import { Link, Badge } from "@cloudflare/kumo";

export default function BadgeLinkList({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <Badge variant="secondary">{item.label}</Badge>
        </Link>
      ))}
    </div>
  );
}
