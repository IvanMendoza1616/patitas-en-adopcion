"use client";
import { DataFetchedType, QueryParams } from "@/app/types/types";
import { useEffect, useState } from "react";
import LoadingPets from "./LoadingPets";
import Pagination from "./Pagination";
import Sort from "../pet-search/Sort";
import axios from "axios";
import ShelterPetCard from "../account/pets/ShelterPetCard";
import PetCard from "../pet-search/pets/PetCard";

type Props = {
  params: QueryParams;
  shelter?: boolean;
};

const initialResponse = {
  success: false,
  data: [],
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
  },
};
export default function PetsGrid({ params, shelter }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] =
    useState<DataFetchedType>(initialResponse);

  useEffect(() => {
    const getPets = async () => {
      setIsLoading(true);
      const queryString = new URLSearchParams(
        params as Record<string, string>,
      ).toString();
      try {
        const url = shelter ? "get-shelter-pets" : "get-pets";
        const response = await axios.get(`/api/${url}?${queryString}`);
        setDataFetched(response.data);
      } catch (error) {
        setDataFetched(initialResponse);
      }
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
  }, [params, shelter]);

  if (!dataFetched.success && !isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center bg-gray-200 p-4">
        There was an error with the page.
      </div>
    );
  }

  const pets = shelter
    ? dataFetched.data.map((pet) => (
        <ShelterPetCard key={pet._id.toString()} pet={pet} />
      ))
    : dataFetched.data.map((pet) => (
        <PetCard
          key={pet._id.toString()}
          pet={pet}
          userLat={params.lat}
          userLon={params.lon}
        />
      ));

  return (
    <div className="flex flex-col gap-4">
      {!shelter && (
        <Sort
          currentPage={dataFetched.pagination.currentPage}
          pageSize={dataFetched.pagination.pageSize}
          totalCount={dataFetched.pagination.totalCount}
          isLoading={isLoading}
        />
      )}

      {isLoading ? (
        <LoadingPets />
      ) : dataFetched.data.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center bg-gray-200 p-4">
          <p>There are no pets with this parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 bg-gray-200 p-4">
          {pets}
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
