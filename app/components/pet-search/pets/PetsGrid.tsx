"use client";
import { Pet, QueryParams } from "@/app/types/types";
import { useEffect, useState } from "react";
import LoadingPets from "./LoadingPets";
import { haversineFormula } from "@/app/utils/haversineFormula";
import Pagination from "./Pagination";
import Sort from "../Sort";
import { getAge } from "@/app/utils/formatDate";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/app/utils/textFormat";
//import Image from "next/image";

type DataFetchedType = {
  success: boolean;
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
    success: false,
    data: [],
    pagination: {
      currentPage: 0,
      pageSize: 0,
      totalCount: 0,
      totalPages: 0,
    },
  });

  useEffect(() => {
    const getPets = async () => {
      setIsLoading(true);
      const queryString = new URLSearchParams(
        params as Record<string, string>,
      ).toString();

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `/api/get-pets?${queryString}`,
        requestOptions,
      );
      const data = await response.json();

      setDataFetched(data);
      setIsLoading(false);

      //Emulate an API call each time params are updated
      /*
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

        const createdA = petA.createdAt;
        const createdB = petB.createdAt;

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
        if (params.sort === "newest-addition") return createdB - createdA;
        if (params.sort === "oldest-addition") return createdA - createdB;
        return updatedB - updatedA;
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
      */
    };
    getPets();
  }, [params]);

  if (!dataFetched.success && !isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center bg-gray-200 p-4">
        There was an error with the page.
      </div>
    );
  }

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
              href={`/pet/${pet._id}`}
              className="flex flex-col items-center justify-center bg-gray-300 p-4"
              key={pet._id}
            >
              <img
                src={pet.imageUrl}
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
                      pet.location.coordinates[1],
                      pet.location.coordinates[0],
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
