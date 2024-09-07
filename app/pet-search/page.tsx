import Sort from "../components/pet-search/Sort";
import Filters from "../components/pet-search/filters/Filters";
import PetsGrid from "../components/pet-search/pets/PetsGrid";
import { SearchParams } from "../types/types";

export default function PetSearch({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = searchParams;

  return (
    <main className="m-auto flex w-full max-w-[1200px] flex-col gap-4 bg-gray-100 p-2 md:flex-row md:p-8">
      <Filters />
      <div className="flex w-full flex-col gap-4 md:w-3/4">
        <Sort />
        <PetsGrid params={params} />
      </div>
    </main>
  );
}
