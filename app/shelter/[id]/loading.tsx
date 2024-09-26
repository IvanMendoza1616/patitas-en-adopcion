import ProfileContainer from "@/app/components/UI/containers/ProfileContainer";

export default function Loading() {
  return (
    <ProfileContainer>
      <div className="flex w-full animate-pulse flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="aspect-square w-[100px] rounded-full bg-gray-100" />
          <div className="flex w-full flex-col gap-2">
            <div className="h-[30px] w-1/3 bg-gray-100" />
            <div className="h-[20px] w-2/3 bg-gray-100" />
          </div>
        </div>
        <div className="h-[30px] w-2/3 self-start bg-gray-100" />
        <div className="h-[25px] w-full bg-gray-100" />
        <div className="h-[25px] w-11/12 self-start bg-gray-100" />
        <div className="h-[25px] w-full bg-gray-100" />
        <div className="h-[25px] w-11/12 self-start bg-gray-100" />
      </div>
    </ProfileContainer>
  );
}
