"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
  handleThemeChange: (mode: string) => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("light");
  //   const handleThemeChange = () => {
  //     if (
  //       localStorage.theme === "dark" ||
  //       (!("theme" in localStorage) &&
  //         window.matchMedia("(prefers-color-scheme:dark)").matches)
  //     ) {
  //       setMode("dark");
  //       document.documentElement.classList.add("dark");
  //     } else {
  //       setMode("light");
  //       document.documentElement.classList.add("light");
  //       document.documentElement.classList.remove("dark");
  //     }
  //   };
  const handleThemeChange = (mode: string) => {
    if (mode == "dark") {
      setMode(mode);
      document.documentElement.classList.add("dark");
    } else {
      setMode(mode);
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    handleThemeChange("dark");
  }, []);
  return (
    <ThemeContext.Provider value={{ mode, setMode, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used with in a ThemeProvider");
  }
  return context;
}
