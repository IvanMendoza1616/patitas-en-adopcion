export default function LoadingPets() {
  const loadingPet = (
    <div className="flex animate-pulse flex-col items-center justify-center gap-2 bg-gray-300 p-4">
      <div className="aspect-square w-32 bg-gray-400" />
      <div className="h-6 w-32 bg-gray-400" />
      <div className="h-6 w-32 bg-gray-400" />
      <div className="h-6 w-32 bg-gray-400" />
    </div>
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 bg-gray-200 p-4">
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
      {loadingPet}
    </div>
  );
}
