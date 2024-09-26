import LoadingPets from "../components/UI/LoadingPets";

export default function Loading() {
  return (
    <main className="m-auto flex w-full max-w-[1200px] animate-pulse flex-col gap-4 px-4 md:flex-row">
      <div className="hidden w-full grid-cols-2 gap-6 rounded-lg p-4 shadow-md md:flex md:w-1/4 md:flex-col">
        <div className="h-[25px] w-1/2 bg-gray-100" />
        <div className="h-[30px] w-2/3 bg-gray-100" />
        <div className="h-[25px] w-1/2 bg-gray-100" />
        <div className="h-[30px] w-2/3 bg-gray-100" />
        <div className="h-[25px] w-1/2 bg-gray-100" />
        <div className="h-[30px] w-2/3 bg-gray-100" />
        <div className="h-[25px] w-1/2 bg-gray-100" />
        <div className="h-[30px] w-2/3 bg-gray-100" />
      </div>
      <div className="w-full md:w-3/4">
        <div className="flex h-[73px] items-center justify-between">
          <div className="h-[30px] w-1/3 bg-gray-100" />
          <div className="h-[30px] w-1/3 bg-gray-100" />
        </div>
        <LoadingPets />
      </div>
    </main>
  );
}
