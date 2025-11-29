import React, { useEffect, useState } from "react";

const THEME_KEY = "savedTheme";

export default function ThemeSelector() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "standard";
    } catch {
      return "standard";
    }
  });

  useEffect(() => {
    // apply body class
    document.body.classList.remove("standard", "light", "darker");
    document.body.classList.add(theme);

    // toggle darker-title on #title if present
    const titleEl = document.getElementById("title");
    if (titleEl) {
      if (theme === "darker") titleEl.classList.add("darker-title");
      else titleEl.classList.remove("darker-title");
    }

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  return (
    <div className="flexrow-container" aria-hidden="false">
      <div
        role="button"
        tabIndex={0}
        className="standard-theme theme-selector"
        onClick={() => setTheme("standard")}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setTheme("standard")}
        title="Standard theme"
      />
      <div
        role="button"
        tabIndex={0}
        className="light-theme theme-selector"
        onClick={() => setTheme("light")}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setTheme("light")}
        title="Light theme"
      />
      <div
        role="button"
        tabIndex={0}
        className="darker-theme theme-selector"
        onClick={() => setTheme("darker")}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setTheme("darker")}
        title="Darker theme"
      />
    </div>
  );
}