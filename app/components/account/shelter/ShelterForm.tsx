"use client";
import { updateShelter } from "@/app/actions";
import { useFormState } from "react-dom";
import SubmitButton from "../../UI/SubmitButton";
import FormMessage from "../FormMessage";
import { Shelter } from "@/app/types/types";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ImageInput from "../../edit-pet/ImageInput";
import TextInput from "../../UI/inputs/TextInput";
import TextAreaInput from "../../UI/inputs/TextAreaInput";

type Props = {
  shelter: Shelter;
};

export default function ShelterForm({ shelter }: Props) {
  //Imported component as CSR
  //Example from https://andresprieto-25116.medium.com/how-to-use-react-leaflet-in-nextjs-with-typescript-surviving-it-21a3379d4d18
  const LocationInput = useMemo(
    () =>
      dynamic(() => import("../../UI/LocationInput"), {
        loading: () => (
          <div className="flex h-[500px] w-full items-center justify-center bg-gray-100">
            <p>A map is loading...</p>
          </div>
        ),
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
      <ImageInput currentImage={shelter.imageUrl} shelter />
      <TextInput
        label="Shelter name"
        placeholder="Enter shelter name"
        name="shelter-name"
        id="shelter-name"
        defaultValue={shelter.name}
        required
      />
      <TextAreaInput
        label="Description"
        placeholder="Add a brief description"
        name="description"
        id="description"
        rows={4}
        defaultValue={shelter.description}
        required
      />
      <TextInput
        label="Phone number"
        placeholder="+52 833 123 4567"
        name="phone"
        id="phone"
        defaultValue={shelter.phone}
        required
      />
      <TextInput
        label="Email"
        placeholder="myemail@test.com"
        name="email"
        id="email"
        defaultValue={shelter.email}
        required
      />
      <TextInput
        label="Facebook"
        placeholder="Enter your shelter's Facebook"
        name="facebook"
        id="facebook"
        defaultValue={shelter.facebook}
      />
      <TextInput
        label="Instagram"
        placeholder="Enter your shelter's Instagram"
        name="instagram"
        id="instagram"
        defaultValue={shelter.instagram}
      />
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Address</p>
        <LocationInput
          defaultAddress={shelter.address}
          defaultCoordinates={shelter.location.coordinates}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <FormMessage success={state.success} message={state.message} />
        <SubmitButton>Update</SubmitButton>
      </div>
    </form>
  );
}
