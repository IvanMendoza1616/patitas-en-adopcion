"use client";
import ProfileContainer from "@/app/components/UI/containers/ProfileContainer";

export default function Error() {
  return (
    <ProfileContainer>
      <div className="flex h-[300px] items-center justify-center">
        <p>There was an error fetching the pet</p>
      </div>
    </ProfileContainer>
  );
}
