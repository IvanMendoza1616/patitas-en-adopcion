import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  message: string;
};

export default function Message({ message }: Props) {
  const { pending } = useFormStatus();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; // Declare timer here
    if (!pending && message) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false); // Reset message after a few seconds
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [message, pending]);

  return <p className="flex h-[30px] items-center">{isVisible && message}</p>;
}
