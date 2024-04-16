import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ThreeDots height="80" width="80" color="#fff" />
    </div>
  );
}
