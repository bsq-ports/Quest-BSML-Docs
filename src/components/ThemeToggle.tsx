import { useEffect, useState } from "react";
import { Sidebar } from "@cloudflare/kumo";
import { Moon, Sun } from "@phosphor-icons/react";
import { applyMode, getStoredMode, getSystemMode, type ThemeMode } from "../lib/theme";

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(() => getStoredMode() ?? getSystemMode());

  useEffect(() => {
    applyMode(mode);
  }, [mode]);

  return (
    <Sidebar.MenuButton
      icon={mode === "dark" ? Sun : Moon}
      onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
    >
      {mode === "dark" ? "Light mode" : "Dark mode"}
    </Sidebar.MenuButton>
  );
}
