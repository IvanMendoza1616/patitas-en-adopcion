"use client";
import ProfileContainer from "@/app/components/UI/containers/ProfileContainer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ProfileContainer>
      <div className="flex h-[300px] items-center justify-center">
        <p>There was an error fetching the pet</p>
        <p>{error.digest}</p>
      </div>
    </ProfileContainer>
  );
}
