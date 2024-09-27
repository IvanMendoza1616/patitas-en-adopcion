import { ReactNode } from "react";

type Props = {
  children: ReactNode | string;
  type: "submit" | "reset" | "button";
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
};
export default function Button({
  children,
  type,
  variant,
  onClick,
  disabled,
}: Props) {
  const style =
    variant === "secondary"
      ? "border py-1"
      : `w-full rounded-lg shadow-md bg-black text-white ${type === "submit" ? "py-3" : "py-2"}`;

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-4 ${style}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
