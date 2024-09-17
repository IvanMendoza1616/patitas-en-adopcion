"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Props = {
  path: string;
};

export default function SuccessMessage({ path }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success) {
      // Delay execution
      const timer = setTimeout(() => {
        // Redirect to the same page without the success query parameter
        router.replace(path);
      }, 2000);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [success, router, path]);

  if (!success) return null;

  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-center">
      <p className="bg-gray-300 px-4 py-2">Updated successfully!</p>
    </div>
  );
}
