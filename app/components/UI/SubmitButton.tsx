import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: ReactNode;
};

export default function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      className="self-start bg-gray-200 px-2 py-1"
      type="submit"
      disabled={pending}
    >
      {pending ? "Loading" : children}
    </button>
  );
}
