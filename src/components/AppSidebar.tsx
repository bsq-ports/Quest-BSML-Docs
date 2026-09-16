import { useRouterState } from "@tanstack/react-router";
import { Sidebar, Link } from "@cloudflare/kumo";
import {
  House,
  BookOpen,
  Database,
  Wrench,
  Tag,
  Function,
  Cube,
  GithubLogo,
} from "@phosphor-icons/react";
import { sortedTags, sortedMacros, sortedComponents } from "../lib/docs";
import ThemeToggle from "./ThemeToggle";

const topLinks = [
  { href: "/", label: "Home", icon: House },
  { href: "/getting-started", label: "Getting Started", icon: BookOpen },
  { href: "/data-cache", label: "Data Cache", icon: Database },
  { href: "/development", label: "Development", icon: Wrench },
];

export default function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar>
      <Sidebar.Header>
        <img src="/BSQML.png" alt="" className="size-6 rounded" />
        <span>Quest BSML Docs</span>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Menu>
            {topLinks.map((item) => (
              <Sidebar.MenuButton
                key={item.href}
                href={item.href}
                icon={item.icon}
                active={pathname === item.href}
              >
                {item.label}
              </Sidebar.MenuButton>
            ))}
          </Sidebar.Menu>
        </Sidebar.Group>

        <Sidebar.Group>
          <Sidebar.Menu>
            <NavDropdown
              label="Tags"
              icon={Tag}
              basePath="/tags"
              pathname={pathname}
              items={sortedTags().map((t) => ({
                href: `/tags/${t.name}`,
                label: t.name,
              }))}
            />
            <NavDropdown
              label="Macros"
              icon={Function}
              basePath="/macros"
              pathname={pathname}
              items={sortedMacros().map((m) => ({
                href: `/macros/${m.name}`,
                label: m.name,
              }))}
            />
            <NavDropdown
              label="Components"
              icon={Cube}
              basePath="/components"
              pathname={pathname}
              items={sortedComponents().map((c) => ({
                href: `/components/${c.typename}`,
                label: c.typename,
              }))}
            />
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Menu>
          <ThemeToggle />
        </Sidebar.Menu>
        <Link
          href="https://github.com/RedBrumbler/Quest-BSML"
          target="_blank"
          rel="noopener noreferrer"
          variant="plain"
          className="flex items-center gap-2 px-3 py-2 text-sm"
        >
          <GithubLogo className="size-4" />
          View source
        </Link>
      </Sidebar.Footer>
    </Sidebar>
  );
}

type NavDropdownProps = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  basePath: string;
  pathname: string;
  items: { href: string; label: string }[];
};

function NavDropdown({ label, icon, basePath, pathname, items }: NavDropdownProps) {
  const isActiveGroup = pathname === basePath || pathname.startsWith(`${basePath}/`);

  return (
    <Sidebar.MenuItem>
      <Sidebar.Collapsible defaultOpen={isActiveGroup}>
        <Sidebar.CollapsibleTrigger
          render={
            <Sidebar.MenuButton icon={icon}>
              {label}
              <Sidebar.MenuChevron />
            </Sidebar.MenuButton>
          }
        />
        <Sidebar.CollapsibleContent>
          <Sidebar.MenuSub>
            <Sidebar.MenuSubItem>
              <Sidebar.MenuSubButton href={basePath} active={pathname === basePath}>
                All {label}
              </Sidebar.MenuSubButton>
            </Sidebar.MenuSubItem>
            {items.map((item) => (
              <Sidebar.MenuSubItem key={item.href}>
                <Sidebar.MenuSubButton
                  href={item.href}
                  active={pathname === item.href}
                >
                  {item.label}
                </Sidebar.MenuSubButton>
              </Sidebar.MenuSubItem>
            ))}
          </Sidebar.MenuSub>
        </Sidebar.CollapsibleContent>
      </Sidebar.Collapsible>
    </Sidebar.MenuItem>
  );
}
