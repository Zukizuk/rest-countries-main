"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowMenu } from "./Icons";
import { filters } from "../constant";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Filters() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const paramFilter = searchParams.get("filter");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Update URL
  const updateUrl = (value: string, paramName: string = "filter") => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }

    router.push(pathname + "?" + params.toString(), { scroll: false });
    if (isMenuOpen) closeMenu();
  };

  // Remove filter
  const removeFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filter");

    router.push(pathname + "?" + params.toString(), { scroll: false });
    if (isMenuOpen) closeMenu();
  };

  // Handle click outside of the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="main__filters">
      <SearchBar />

      <div className="filter__select" ref={menuRef}>
        <button className="select__button" onClick={toggleMenu}>
          {paramFilter || "Filter by Region"}
          <ArrowMenu />
        </button>
        {isMenuOpen ? (
          <ul className="select__options">
            <li onClick={removeFilter}>Remove Filter</li>
            {filters.map((filter) => (
              <li key={filter.id} onClick={() => updateUrl(filter.name)}>
                {filter.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
