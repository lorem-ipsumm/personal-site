"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useThemeStore } from "~/hooks/state/useThemeStore";

export default function ThemeToggle() {
  const { toggleTheme, theme } = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="text-foreground relative h-8 w-8 cursor-pointer p-0"
    >
      {theme === "light" && <Moon className="absolute h-4 w-4" />}
      {theme === "dark" && <Sun className="h-4 w-4 scale-100 rotate-0" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
