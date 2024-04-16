import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "../context/ThemeContext";

export default function Loading() {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ThreeDots
        height="80"
        width="80"
        color={theme === "dark" ? "#fff" : "#000"}
      />
    </div>
  );
}
