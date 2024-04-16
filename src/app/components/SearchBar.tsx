import React, { useEffect, useState } from "react";
import { SearchIcon } from "./Icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../hooks";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.get("query");
  const [search, setSearch] = useState(query || "");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch === "") {
      params.delete("query");
    } else {
      params.set("query", debouncedSearch);
    }

    router.push(pathname + "?" + params.toString(), { scroll: false });
  }, [debouncedSearch, router, pathname, searchParams]);

  return (
    <div className="filter__search">
      <SearchIcon />
      <input
        className="search__input"
        type="search"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a country..."
      />
    </div>
  );
}
