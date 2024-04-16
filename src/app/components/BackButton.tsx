"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "./Icons";

const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="back__button">
      <ArrowLeftIcon width={16} height={16} fill="currentColor" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
