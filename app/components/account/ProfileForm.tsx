"use client";
import { updateUser } from "@/app/actions";
import { useFormState } from "react-dom";
import SubmitButton from "../UI/SubmitButton";
import FormMessage from "./FormMessage";

type Props = {
  sessionUser: {
    name: string;
    email: string;
    image: string;
    role: string;
  };
};

export default function ProfileForm({ sessionUser }: Props) {
  const [state, formAction] = useFormState(updateUser, { message: "" });

  return (
    <div className="bg-gray-300 p-4">
      <h2 className="mb-6 text-2xl">Profile Information</h2>
      <form action={formAction} className="flex flex-col gap-4 sm:max-w-[50%]">
        <div className="flex flex-col">
          <p>Email:</p>
          <p>{sessionUser.email}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name*</label>
          <input
            className="px-2"
            type="text"
            name="name"
            id="name"
            defaultValue={sessionUser.name}
            required
          />
        </div>
        <div className="mt-12 flex items-center gap-4">
          <SubmitButton>Update</SubmitButton>
          <FormMessage message={state.message} />
        </div>
      </form>
    </div>
  );
}
