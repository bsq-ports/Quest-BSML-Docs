import { forwardRef } from "react";
import { Link } from "@tanstack/react-router";
import type { LinkComponentProps } from "@cloudflare/kumo";

// Bridges Kumo's Link/Button/Sidebar navigation (which speak `href`) to
// TanStack Router's client-side `Link`, per Kumo's LinkProvider contract.
const AppLink = forwardRef<HTMLAnchorElement, LinkComponentProps>(
  ({ href, to, ...rest }, ref) => (
    // `to` is typed against the generated route tree, but this bridge hands off
    // arbitrary runtime strings from a router-agnostic component, so it can't be
    // statically checked here.
    <Link ref={ref} to={(to ?? href ?? "") as never} {...rest} />
  ),
);
AppLink.displayName = "AppLink";

export default AppLink;
