"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function SearchInput() {
  const { queryParams, setQueryParams } = useQueryParams();
  const [search, setSearch] = useState(queryParams.search?.toString() || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearch(queryParams.search?.toString() || "");
  }, [queryParams.search]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.blur();
    if (search.length === 0) return;
    setQueryParams({ search, page: "1" });
  };

  return (
    <form
      className="col-span-3 flex items-center justify-center gap-2 md:col-span-1"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Search pets..."
        ref={inputRef}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        name="search"
        id="search"
        className="w-full rounded-md border px-3 py-2 focus:outline-primary"
      />
    </form>
  );
}
