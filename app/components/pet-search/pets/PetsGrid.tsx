"use client";
import { Pet, SearchParams } from "@/app/types/types";
import { petData } from "@/petData";
import { useEffect, useState } from "react";
import LoadingPets from "./LoadingPets";
import { haversineFormula } from "@/app/utils/haversineFormula";
import Pagination from "./Pagination";
import Sort from "../Sort";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import { formatDate, getAge } from "@/app/utils/formatDate";
import { ageInRange } from "@/app/utils/ageInRange";

type dataFetchedType = {
  data: Pet[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
};

type Props = {
  params: SearchParams;
};

export default function PetsGrid({ params }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const { setQueryParams } = useQueryParams();
  const [dataFetched, setDataFetched] = useState<dataFetchedType>({
    data: [],
    pagination: {
      currentPage: 0,
      pageSize: 0,
      totalCount: 0,
      totalPages: 0,
    },
  });

  //Emulate an API call each time params are updated
  useEffect(() => {
    const getPets = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //Filtering
      const filteredPets = petData.filter(
        (pet) =>
          (!params.search ||
            pet.name.toLowerCase().includes(params.search.toLowerCase())) &&
          (!params.species || pet.species === params.species) &&
          //Distance filtering
          (!params.postalCode ||
            !params.lat ||
            !params.lon ||
            !params.distance ||
            haversineFormula(+params.lat, +params.lon, +pet.lat, +pet.lon) <
              +params.distance) &&
          (!params.age || ageInRange(params.age.split(","), pet.birthdate)) &&
          (!params.sex || params.sex.split(",").includes(pet.sex)) &&
          (!params.size || params.size.split(",").includes(pet.size)),
      );

      //Sorting
      const sortedPets = filteredPets.sort((petA, petB) => {
        const birthdateA = +new Date(petA.birthdate);
        const birthdateB = +new Date(petB.birthdate);

        if (params.sort === "youngest") return birthdateB - birthdateA;
        if (params.sort === "oldest") return birthdateA - birthdateB;
        if (params.sort === "nearest" && params.lat && params.lon)
          return (
            haversineFormula(+params.lat, +params.lon, +petA.lat, +petA.lon) -
            haversineFormula(+params.lat, +params.lon, +petB.lat, +petB.lon)
          );

        if (params.sort === "farthest" && params.lat && params.lon)
          return (
            haversineFormula(+params.lat, +params.lon, +petB.lat, +petB.lon) -
            haversineFormula(+params.lat, +params.lon, +petA.lat, +petA.lon)
          );

        return 0;
      });

      //Pagination
      const currentPage = +(params.page || 1);
      const pageSize = 12;
      const totalCount = sortedPets.length;
      const totalPages = Math.ceil(sortedPets.length / pageSize) || 1;

      const startingValue = (currentPage - 1) * pageSize;

      const endingValue =
        currentPage * pageSize < totalCount
          ? currentPage * pageSize
          : totalCount;

      const paginatedPets = sortedPets.slice(startingValue, endingValue);

      const result = {
        data: paginatedPets,
        pagination: {
          currentPage,
          pageSize,
          totalCount,
          totalPages,
        },
      };

      setDataFetched(result);
      setIsLoading(false);
    };
    getPets();
  }, [params]);

  //console.log(dataFetched);

  if (isLoading) return <LoadingPets />;

  if (dataFetched.data.length === 0)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex h-[56px] w-full items-center gap-1 bg-gray-200 p-4">
          {params.search && (
            <>
              <p>
                Searching for{" "}
                <span className="font-bold">&quot;{params.search}&quot;</span>
              </p>
              <button
                className="bg-gray-300 px-4"
                type="button"
                onClick={() => {
                  setQueryParams({ search: "", page: "1" });
                }}
              >
                Clear Search
              </button>
            </>
          )}
        </div>
        <div className="bg-gray-200 p-4">
          <p>There are no pets with this parameters.</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <Sort
        currentPage={dataFetched.pagination.currentPage}
        pageSize={dataFetched.pagination.pageSize}
        totalCount={dataFetched.pagination.totalCount}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 bg-gray-200 p-4">
        {dataFetched.data.map((pet) => (
          <div
            className="flex flex-col items-center justify-center bg-gray-300 p-4"
            key={pet.id}
          >
            <div className="aspect-square w-32 bg-gray-400" />
            <p>{pet.name}</p>
            <p>{pet.species}</p>
            <p>{pet.sex}</p>
            <p>{pet.size}</p>
            <p>{formatDate(pet.birthdate)}</p>
            <p>{getAge(pet.birthdate)}</p>
            {params.postalCode && params.lat && params.lon && (
              <p>
                {Math.round(
                  haversineFormula(
                    +params.lat,
                    +params.lon,
                    +pet.lat,
                    +pet.lon,
                  ),
                )}{" "}
                Km from you
              </p>
            )}
          </div>
        ))}
      </div>
      <Pagination
        currentPage={dataFetched.pagination.currentPage}
        totalPages={dataFetched.pagination.totalPages}
      />
    </div>
  );
}
