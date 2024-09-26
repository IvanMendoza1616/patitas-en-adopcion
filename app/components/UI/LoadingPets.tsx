export default function LoadingPets() {
  const loadingPet = (
    <div className="flex animate-pulse flex-col justify-center gap-2 overflow-hidden rounded-lg shadow-md">
      <div className="h-[200px] w-full bg-gray-200" />
      <div className="flex flex-col gap-2 p-4">
        <div className="mb-4 h-4 w-32 bg-gray-200" />
        <div className="h-4 w-24 bg-gray-200" />
        <div className="h-3 w-32 bg-gray-200" />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 p-4">
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
    </div>
  );
}
