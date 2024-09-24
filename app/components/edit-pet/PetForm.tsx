"use client";
import { Pet } from "@/app/types/types";
import SubmitButton from "../UI/SubmitButton";
import { useFormState } from "react-dom";
import FormMessage from "../account/FormMessage";
import { updatePet } from "@/app/actions";
import ImageInput from "./ImageInput";

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
      className="mx-auto flex w-full max-w-[500px] flex-col justify-center gap-8 bg-gray-200 px-4 py-8"
    >
      <ImageInput currentImage={pet.imageUrl} />

      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name*</label>
        <input
          className="px-2"
          type="text"
          name="name"
          id="name"
          defaultValue={pet.name}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="species">Species*</label>
        <select
          className="px-2"
          name="species"
          id="species"
          defaultValue={pet.species}
          required
        >
          <option value="">Please select</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="sex">Sex*</label>
        <select
          className="px-2"
          name="sex"
          id="sex"
          defaultValue={pet.sex}
          required
        >
          <option value="">Please select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="size">Size*</label>
        <select
          className="px-2"
          name="size"
          id="size"
          defaultValue={pet.size}
          required
        >
          <option value="">Please select</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="x-large">X-Large</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="birthdate">Birthdate*</label>
        <input
          className="px-2"
          type="date"
          name="birthdate"
          id="birthdate"
          defaultValue={pet.birthdate.toISOString().slice(0, 10)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description</label>
        <textarea
          className="resize-none px-2"
          rows={4}
          name="description"
          id="description"
          defaultValue={pet.description}
        />
      </div>
      {state.petId && (
        <div className="flex items-center gap-2">
          <label htmlFor="adopted">Adopted</label>
          <input
            type="checkbox"
            defaultChecked={pet.adopted}
            name="adopted"
            id="adopted"
          />
        </div>
      )}

      <div className="mt-12 flex items-center gap-4">
        <SubmitButton>{pet._id ? "Update" : "Create Pet"}</SubmitButton>
        <FormMessage success={state.success} message={state.message} />
      </div>
    </form>
  );
}
