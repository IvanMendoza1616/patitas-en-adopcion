import ProfileContainer from "@/app/components/UI/containers/ProfileContainer";

export default function Loading() {
  return (
    <ProfileContainer>
      <div className="flex w-full animate-pulse flex-col gap-4">
        <div className="h-[40px] w-2/3 bg-gray-100" />
        <div className="aspect-square w-full bg-gray-100" />
        <div className="h-[30px] w-2/3 self-start bg-gray-100" />
        <div className="h-[25px] w-full bg-gray-100" />
        <div className="h-[25px] w-11/12 self-start bg-gray-100" />
        <div className="h-[25px] w-full bg-gray-100" />
        <div className="h-[25px] w-11/12 self-start bg-gray-100" />
      </div>
    </ProfileContainer>
  );
}
