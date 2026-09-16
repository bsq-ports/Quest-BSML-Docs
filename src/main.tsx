import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { LinkProvider } from "@cloudflare/kumo";
import AppLink from "./components/AppLink";
import { router } from "./router";
import "./app.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LinkProvider component={AppLink}>
      <RouterProvider router={router} />
    </LinkProvider>
  </StrictMode>,
);
