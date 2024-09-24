"use client";
import { updateShelter } from "@/app/actions";
import { useFormState } from "react-dom";
import SubmitButton from "../../UI/SubmitButton";
import FormMessage from "../FormMessage";
import { Shelter } from "@/app/types/types";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ImageInput from "../../edit-pet/ImageInput";

type Props = {
  shelter: Shelter;
};

export default function ShelterForm({ shelter }: Props) {
  //Imported component as CSR
  //Example from https://andresprieto-25116.medium.com/how-to-use-react-leaflet-in-nextjs-with-typescript-surviving-it-21a3379d4d18
  const LocationInput = useMemo(
    () =>
      dynamic(() => import("../../UI/LocationInput"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );
  const [state, formAction] = useFormState(updateShelter, {
    shelterId: shelter._id,
    shelterImageUrl: shelter.imageUrl,
    shelterAddress: shelter.address,
    success: false,
    message: "",
  });

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <ImageInput currentImage={shelter.imageUrl} />
      <div className="flex flex-col gap-1">
        <label htmlFor="shelter-name">Shelter Name*</label>
        <input
          className="px-2"
          type="text"
          name="shelter-name"
          id="shelter-name"
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
      <div className="flex flex-col gap-1">
        <p>Address</p>
        <LocationInput
          defaultAddress={shelter.address}
          defaultCoordinates={shelter.location.coordinates}
        />
      </div>

      <div className="mt-12 flex items-center gap-4">
        <SubmitButton>Update</SubmitButton>
        <FormMessage success={state.success} message={state.message} />
      </div>
    </form>
  );
}
