import type { Metadata } from "next";
import Filters from "../components/pet-search/filters/Filters";
import PetsGrid from "../components/UI/PetsGrid";
import { QueryParams } from "../types/types";

export const metadata: Metadata = {
  title: "Pet Search",
  description:
    "Search and filter through available pets to find your perfect companion for adoption.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: QueryParams;
}) {
  return (
    <main className="m-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 md:flex-row">
      <Filters />
      <div className="w-full md:w-3/4">
        <PetsGrid params={searchParams} />
      </div>
    </main>
  );
}
