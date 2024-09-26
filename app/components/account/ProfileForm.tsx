"use client";
import { updateUser } from "@/app/actions";
import { useFormState } from "react-dom";
import SubmitButton from "../UI/SubmitButton";
import FormMessage from "./FormMessage";
import TextInput from "../UI/inputs/TextInput";

type Props = {
  sessionUser: {
    name: string;
    email: string;
    image: string;
    role: string;
  };
};

export default function ProfileForm({ sessionUser }: Props) {
  const [state, formAction] = useFormState(updateUser, {
    success: false,
    message: "",
  });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Email</p>
        <p>{sessionUser.email}</p>
      </div>
      <TextInput
        label="Name"
        placeholder="John Doe"
        name="name"
        id={"name"}
        defaultValue={sessionUser.name}
        required
      />
      <div className="mt-8 flex flex-col gap-4">
        <FormMessage message={state.message} success={state.success} />
        <SubmitButton>Update</SubmitButton>
      </div>
    </form>
  );
}
