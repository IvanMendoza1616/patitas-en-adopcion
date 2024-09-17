"use client";
import { updateShelter } from "@/app/actions";
import { useFormState } from "react-dom";
import SubmitButton from "../../UI/SubmitButton";
import FormMessage from "../FormMessage";
import { Shelter } from "@/app/types/types";

type Props = {
  shelter: Shelter;
};

export default function ShelterForm({ shelter }: Props) {
  const [state, formAction] = useFormState(updateShelter, { message: "" });

  return (
    <div className="bg-gray-300 p-4">
      <h2 className="mb-6 text-2xl">Shelter Information</h2>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name*</label>
          <input
            className="px-2"
            type="text"
            name="name"
            id="name"
            defaultValue={shelter.name}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description*</label>
          <textarea
            className="resize-none px-2"
            rows={4}
            name="description"
            id="description"
            defaultValue={shelter.description}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone">Phone*</label>
          <input
            className="px-2"
            type="text"
            name="phone"
            id="phone"
            defaultValue={shelter.phone}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email*</label>
          <input
            className="px-2"
            type="text"
            name="email"
            id="email"
            defaultValue={shelter.email}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="facebook">Facebook</label>
          <input
            className="px-2"
            type="text"
            name="facebook"
            id="facebook"
            defaultValue={shelter.facebook}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="instagram">Instagram</label>
          <input
            className="px-2"
            type="text"
            name="instagram"
            id="instagram"
            defaultValue={shelter.instagram}
          />
        </div>
        <p>Image</p>
        <p>Address</p>

        <div className="mt-12 flex items-center gap-4">
          <SubmitButton>Update</SubmitButton>
          <FormMessage message={state.message} />
        </div>
      </form>
    </div>
  );
}
