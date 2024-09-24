"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import Fieldset from "./Fieldset";
import { FormEvent, useState } from "react";
import FilterTag from "./FilterTag";
import dynamic from "next/dynamic";
import { useMemo } from "react";

type FormDataObject = {
  [key: string]: FormDataEntryValue | FormDataEntryValue[];
};

export default function Filters() {
  //Imported component as CSR
  //Example from https://andresprieto-25116.medium.com/how-to-use-react-leaflet-in-nextjs-with-typescript-surviving-it-21a3379d4d18
  const DistanceInput = useMemo(
    () =>
      dynamic(() => import("./DistanceInput"), {
        loading: () => <p>Postal Code</p>,
        ssr: false,
      }),
    [],
  );

  const { queryParams, setQueryParams } = useQueryParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleFormChange = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    //Get array of values for checkboxes
    const ageChannel = formData.getAll("age");
    const sexChannel = formData.getAll("sex");
    const sizeChannel = formData.getAll("size");

    //Get form data from non-array inputs
    const userForm: FormDataObject = Object.fromEntries(formData.entries());

    //Add array values from checkboxes to form
    userForm.age = ageChannel.toString();
    userForm.sex = sexChannel.toString();
    userForm.size = sizeChannel.toString();

    setQueryParams({ ...(userForm as Record<string, string>), page: "1" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        className={`${isOpen ? "grid" : "hidden"} w-full grid-cols-2 gap-6 bg-gray-200 p-4 md:flex md:w-1/4 md:flex-col`}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="species">Species</label>
          <select
            name="species"
            id="species"
            defaultValue={queryParams.species?.toString()}
          >
            <option value="">Any</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <DistanceInput
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
        <Fieldset
          defaultValue={queryParams.age}
          legend="Age"
          fieldsetName="age"
          inputs={[
            { label: "Baby", value: "baby" },
            { label: "Young", value: "young" },
            { label: "Adult", value: "adult" },
            { label: "Senior", value: "senior" },
          ]}
        />
        <Fieldset
          defaultValue={queryParams.sex}
          legend="Sex"
          fieldsetName="sex"
          inputs={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <Fieldset
          defaultValue={queryParams.size}
          legend="Size"
          fieldsetName="size"
          inputs={[
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
            { label: "X-Large", value: "x-large" },
          ]}
        />
        <div
          className={`${!isOpen ? "hidden" : "flex"} col-span-2 items-center justify-center md:hidden`}
        >
          <button
            className="bg-gray-300 px-4 py-1"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close Filters
          </button>
        </div>
      </form>
      <div
        className={`${isOpen ? "hidden" : "flex"} flex-col items-center justify-center gap-8 bg-gray-200 p-4 md:hidden`}
      >
        {(queryParams.species ||
          queryParams.postalCode ||
          queryParams.distance ||
          queryParams.age ||
          queryParams.sex ||
          queryParams.size) && (
          <div className="flex flex-wrap items-center gap-2 self-start">
            <p>Current filters:</p>
            <FilterTag filter={queryParams.species} />
            <FilterTag filter={queryParams.postalCode} />
            <FilterTag
              filter={
                queryParams.distance === "20038" ? null : queryParams.distance
              }
              suffix=" Km or less"
            />
            <FilterTag filter={queryParams.age} />
            <FilterTag filter={queryParams.sex} />
            <FilterTag filter={queryParams.size} />
          </div>
        )}

        <button
          className="bg-gray-300 px-4 py-1"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Open Filters
        </button>
      </div>
    </>
  );
}
