import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@cloudflare/kumo";
import { List } from "@phosphor-icons/react";
import AppSidebar from "../components/AppSidebar";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <Sidebar.Provider className="bg-kumo-base text-kumo-default">
      <AppSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="border-b border-kumo-line p-3 md:hidden">
          <Sidebar.Trigger>
            <List className="size-5" />
          </Sidebar.Trigger>
        </div>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <Outlet />
        </div>
      </main>
    </Sidebar.Provider>
  );
}

function NotFound() {
  return <p>Page not found.</p>;
}
