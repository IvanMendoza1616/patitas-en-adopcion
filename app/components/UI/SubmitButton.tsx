import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: ReactNode;
};

export default function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      className="w-full rounded-lg border bg-black px-4 py-3 text-white"
      type="submit"
      disabled={pending}
    >
      {pending ? "Loading" : children}
    </button>
  );
}
