"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
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
      className="col-span-3 flex items-center justify-center gap-0 overflow-hidden rounded-md border focus-within:outline focus-within:outline-primary md:col-span-1"
      onSubmit={handleSubmit}
    >
      <MagnifyingGlassIcon className="ml-4 mr-2 h-5 w-5 text-gray-400" />
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
        className="w-full py-2 pr-3 focus:outline-none"
      />
    </form>
  );
}
