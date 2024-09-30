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
      ? "py-1 bg-primary-light hover:bg-primary-light-hover"
      : `w-full rounded-lg shadow-md bg-primary hover:bg-primary-hover text-white ${type === "submit" ? "py-3" : "py-2"}`;

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-4 transition ease-in-out ${style}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
