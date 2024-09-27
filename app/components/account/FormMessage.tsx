import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  success: boolean;
  message: string;
};

export default function Message({ success, message }: Props) {
  const { pending } = useFormStatus();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; // Declare timer here
    if (!pending && message) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false); // Reset message after a few seconds
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [message, pending]);

  return (
    <div
      className={`flex h-[40px] items-center justify-center self-center rounded-md px-4 text-white ${isVisible ? (success ? "bg-green-500" : "bg-red-600") : ""}`}
    >
      {isVisible && (
        <div className="flex items-center gap-2">
          {success ? (
            <CheckIcon className="w-5" />
          ) : (
            <XMarkIcon className="w-5" />
          )}
          {message}
        </div>
      )}
    </div>
  );
}
