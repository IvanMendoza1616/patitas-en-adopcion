"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";

export default function Sort() {
  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <div className="flex gap-2 bg-gray-200 p-4">
      <label htmlFor="sort">Sort by: </label>
      <select
        name="sort"
        id="sort"
        defaultValue={queryParams.get("sort")?.toString()}
        onChange={(e) => {
          setQueryParams({ sort: e.target.value });
        }}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
