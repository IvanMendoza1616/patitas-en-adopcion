"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import Fieldset from "./Fieldset";
import { FormEvent } from "react";
import DistanceInput from "./DistanceInput";

type FormDataObject = {
  [key: string]: FormDataEntryValue | FormDataEntryValue[];
};

export default function Filters() {
  const { queryParams, setQueryParams } = useQueryParams();

  const handleFormChange = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const ageChannel = formData.getAll("age");
    const sexChannel = formData.getAll("sex");
    const sizeChannel = formData.getAll("size");
    const userForm: FormDataObject = Object.fromEntries(formData.entries());
    userForm.age = ageChannel.toString();
    userForm.sex = sexChannel.toString();
    userForm.size = sizeChannel.toString();
    setQueryParams(userForm as Record<string, string>);
  };

  return (
    <form
      className="grid w-full grid-cols-2 gap-6 bg-gray-200 p-4 md:flex md:w-1/4 md:flex-col"
      onChange={handleFormChange}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="species">Species</label>
        <select
          name="species"
          id="species"
          defaultValue={queryParams.get("species")?.toString()}
          onChange={(e) => {
            setQueryParams({ species: e.target.value });
          }}
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
        queryParams={queryParams}
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
        queryParams={queryParams}
        legend="Sex"
        fieldsetName="sex"
        inputs={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />

      <Fieldset
        queryParams={queryParams}
        legend="Size"
        fieldsetName="size"
        inputs={[
          { label: "Small", value: "small" },
          { label: "Medium", value: "medium" },
          { label: "Large", value: "large" },
          { label: "X-Large", value: "xlarge" },
        ]}
      />
    </form>
  );
}
