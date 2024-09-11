"use client";
import { Pet, QueryParams } from "@/app/types/types";
import { petData } from "@/petData";
import { useEffect, useState } from "react";
import LoadingPets from "./LoadingPets";
import { haversineFormula } from "@/app/utils/haversineFormula";
import Pagination from "./Pagination";
import Sort from "../Sort";
import { getAge } from "@/app/utils/formatDate";
import { ageInRange } from "@/app/utils/ageInRange";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/app/utils/textFormat";
//import Image from "next/image";

type DataFetchedType = {
  data: Pet[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
};

type Props = {
  params: QueryParams;
};

export default function PetsGrid({ params }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState<DataFetchedType>({
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
            haversineFormula(+params.lat, +params.lon, pet.lat, pet.lon) <
              +params.distance) &&
          (!params.age || ageInRange(params.age.split(","), pet.birthdate)) &&
          (!params.sex || params.sex.split(",").includes(pet.sex)) &&
          (!params.size || params.size.split(",").includes(pet.size)),
      );

      //Sorting
      const sortedPets = filteredPets.sort((petA, petB) => {
        const birthdateA = +new Date(petA.birthdate);
        const birthdateB = +new Date(petB.birthdate);

        const updatedA = petA.updatedAt;
        const updatedB = petB.updatedAt;

        const distanceA =
          (params.lat &&
            params.lon &&
            haversineFormula(+params.lat, +params.lon, petA.lat, petA.lon)) ||
          0;
        const distanceB =
          (params.lat &&
            params.lon &&
            haversineFormula(+params.lat, +params.lon, petB.lat, petB.lon)) ||
          0;

        if (params.sort === "youngest") return birthdateB - birthdateA;
        if (params.sort === "oldest") return birthdateA - birthdateB;
        if (params.sort === "nearest") return distanceA - distanceB;
        if (params.sort === "newest-addition") return updatedB - updatedA;
        if (params.sort === "oldest-addition") return updatedA - updatedB;
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

  return (
    <div className="flex flex-col gap-4">
      <Sort
        currentPage={dataFetched.pagination.currentPage}
        pageSize={dataFetched.pagination.pageSize}
        totalCount={dataFetched.pagination.totalCount}
        isLoading={isLoading}
      />
      {isLoading ? (
        <LoadingPets />
      ) : dataFetched.data.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center bg-gray-200 p-4">
          <p>There are no pets with this parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 bg-gray-200 p-4">
          {dataFetched.data.map((pet) => (
            <Link
              href={`/pet/${pet.id}`}
              className="flex flex-col items-center justify-center bg-gray-300 p-4"
              key={pet.id}
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="aspect-square w-full object-cover"
              />
              <p className="text-2xl">{pet.name}</p>
              <p>
                {capitalizeFirstLetter(pet.sex)},{" "}
                {capitalizeFirstLetter(pet.size)}
              </p>
              <p>{getAge(pet.birthdate)}</p>
              {params.postalCode && params.lat && params.lon && (
                <p>
                  {Math.floor(
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
            </Link>
          ))}
        </div>
      )}
      {!isLoading && dataFetched.data.length > 0 && (
        <Pagination
          currentPage={dataFetched.pagination.currentPage}
          totalPages={dataFetched.pagination.totalPages}
        />
      )}
    </div>
  );
}
