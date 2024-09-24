"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import { useEffect, useState } from "react";

export default function AdoptedToggle() {
  const { queryParams, setQueryParams } = useQueryParams();
  const [isAdopted, setIsAdopted] = useState(
    queryParams.adopted?.toString() === "true",
  );

  useEffect(() => {
    setIsAdopted(queryParams.adopted?.toString() === "true");
  }, [queryParams.adopted]);

  const handleChange = () => {
    setIsAdopted((prevState) => !prevState);
    setQueryParams({ adopted: !isAdopted ? "true" : "", page: "1" }); //isAdopted needs to be inverted because state hasn't changed yet
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="adopted">Show Adopted</label>
      <input
        onChange={handleChange}
        type="checkbox"
        checked={isAdopted}
        name="adopted"
        id="adopted"
      />
    </div>
  );
}
