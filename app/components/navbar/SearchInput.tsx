"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function SearchInput() {
  const { queryParams, setQueryParams } = useQueryParams();
  const [search, setSearch] = useState(
    queryParams.get("search")?.toString() || "",
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearch(queryParams.get("search")?.toString() || "");
  }, [queryParams]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.blur();
    setQueryParams({ search, page: "1" });
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <label htmlFor="search">Search:</label>
      <input
        ref={inputRef}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        name="search"
        id="search"
        className="w-[20px] border px-2"
      />
    </form>
  );
}
