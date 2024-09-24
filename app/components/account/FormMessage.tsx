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
    <p
      className={`flex h-[30px] items-center px-2 py-1 ${isVisible ? (success ? "bg-gray-100" : "bg-gray-100") : ""}`}
    >
      {isVisible && message}
    </p>
  );
}
