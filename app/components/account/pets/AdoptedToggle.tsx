"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import { useEffect, useState } from "react";
import CheckboxInput from "../../UI/inputs/CheckboxInput";

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
    <CheckboxInput
      label="Show adopted"
      name="adopted"
      id="adopted"
      checked={isAdopted}
      onChange={handleChange}
      inverted
    />
  );
}
