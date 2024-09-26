"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function SearchInput() {
  const { queryParams, setQueryParams } = useQueryParams();
  const [searchName, setSearchName] = useState(
    queryParams.searchName?.toString() || "",
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchName(queryParams.searchName?.toString() || "");
  }, [queryParams.searchName]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.blur();
    setQueryParams({ searchName, page: "1" });
  };

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
      <input
        placeholder="Search name..."
        ref={inputRef}
        value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
        type="text"
        name="searchName"
        id="searchName"
        className="w-full rounded-md border px-3 py-2"
      />

      {queryParams.searchName && (
        <div className="flex w-full items-center gap-4">
          <p>
            Searching for{" "}
            <span className="font-bold">
              &quot;{queryParams.searchName}&quot;
            </span>
          </p>
          <button
            type="button"
            onClick={() => {
              setQueryParams({ searchName: "", page: "1" });
            }}
            className="rounded-md border px-4 py-1"
          >
            Clear search
          </button>
        </div>
      )}
    </form>
  );
}
