import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  // Load the theme from localStorage or set default theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="flex items-center space-x-3">
      <Sun className="size-6" />
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} aria-label="Toggle theme" />
      <Label htmlFor="theme-toggle" className="sr-only">
        Toggle theme
      </Label>
      <Moon className="size-6" />
    </div>
  );
}
