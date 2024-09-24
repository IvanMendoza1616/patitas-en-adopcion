import { QueryParams } from "@/app/types/types";
import SearchName from "@/app/components/account/pets/SearchName";
import AdoptedToggle from "@/app/components/account/pets/AdoptedToggle";
import PetsGrid from "@/app/components/UI/PetsGrid";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: QueryParams;
}) {
  return (
    <div className="flex flex-col gap-4 bg-gray-300 p-4">
      <Link href="/new-pet" className="self-end bg-gray-200 px-2 py-1">
        + Add Pet
      </Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <SearchName />
        <AdoptedToggle />
      </div>
      <PetsGrid shelter params={searchParams} />
    </div>
  );
}
