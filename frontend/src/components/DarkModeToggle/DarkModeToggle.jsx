import { useState, useEffect } from "react";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";
import "react-toggle/style.css";

const DarkModeToggle = () => {
  const savedTheme = localStorage.getItem("darkMode");
  const systemPrefersDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });

  const [isDark, setIsDark] = useState(() => {
    if (savedTheme !== null) return savedTheme === "enabled";
    return systemPrefersDark;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [isDark]);

  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    />
  );
};

export default DarkModeToggle;
