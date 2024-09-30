"use client";
import { Pet } from "@/app/types/types";
import SubmitButton from "../UI/SubmitButton";
import { useFormState } from "react-dom";
import FormMessage from "../account/FormMessage";
import { updatePet } from "@/app/actions";
import ImageInput from "./ImageInput";
import TextInput from "../UI/inputs/TextInput";
import SelectInput from "../UI/inputs/SelectInput";
import TextAreaInput from "../UI/inputs/TextAreaInput";
import CheckboxInput from "../UI/inputs/CheckboxInput";

type Props = {
  pet: Pet;
};

export default function EditPetForm({ pet }: Props) {
  const [state, formAction] = useFormState(updatePet, {
    petId: pet._id,
    petImageUrl: pet.imageUrl,
    success: false,
    message: "",
  });

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full flex-col justify-center gap-8 px-4"
    >
      <ImageInput currentImage={pet.imageUrl} />
      <TextInput
        label="Name"
        placeholder="Enter pet name"
        name="name"
        id="name"
        defaultValue={pet.name}
        required
      />
      <SelectInput
        label="Animal Type"
        name="species"
        id="species"
        defaultValue={pet.species}
        required
      >
        <option value="">Select one</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
      </SelectInput>
      <SelectInput
        label="Sex"
        name="sex"
        id="sex"
        defaultValue={pet.sex}
        required
      >
        <option value="">Select one</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </SelectInput>
      <SelectInput
        label="Size"
        name="size"
        id="size"
        defaultValue={pet.size}
        required
      >
        <option value="">Select one</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="x-large">X-Large</option>
      </SelectInput>
      <div className="flex flex-col gap-1">
        <label className="font-semibold" htmlFor="birthdate">
          Birthdate
        </label>
        <input
          placeholder="Select the birthdate"
          type="date"
          name="birthdate"
          id="birthdate"
          className="w-full rounded-md border px-3 py-2 focus:outline-primary"
          defaultValue={pet.birthdate.toISOString().slice(0, 10)}
          required
        />
      </div>
      <TextAreaInput
        label="Description"
        placeholder="Add a description of the pet"
        name="description"
        id="description"
        defaultValue={pet.description}
        rows={4}
      />
      {state.petId && (
        <CheckboxInput
          label="Adopted"
          name="adopted"
          id="adopted"
          defaultChecked={pet.adopted}
        />
      )}
      <div className="mt-8 flex flex-col gap-4">
        <FormMessage success={state.success} message={state.message} />
        <SubmitButton>{pet._id ? "Update" : "Create Pet"}</SubmitButton>
      </div>
    </form>
  );
}
