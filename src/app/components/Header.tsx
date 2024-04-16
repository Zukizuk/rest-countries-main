"use client";

import React from "react";
import { MoonDarkModeIcon, MoonLightModeIcon } from "./Icons";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__container">
        <a href="/">
          <h2>Where in the world?</h2>
        </a>
        <button className="header__toggle-button" onClick={toggleTheme}>
          {theme === "light" ? <MoonDarkModeIcon /> : <MoonLightModeIcon />}
          <span>Dark Mode</span>
        </button>
      </div>
    </header>
  );
}
