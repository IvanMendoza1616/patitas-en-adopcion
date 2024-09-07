"use client";
import { Pet, SearchParams } from "@/app/types/types";
import { petData } from "@/petData";
import { useEffect, useState } from "react";
import LoadingPets from "./LoadingPets";
import { haversineFormula } from "@/app/utils/haversineFormula";

type Props = {
  params: SearchParams;
};

export default function PetsGrid({ params }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState<Pet[]>([]);

  //Emulate an API call each time params are updated
  useEffect(() => {
    const getPets = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //Filtering and sorting
      const filteredPets = petData.filter(
        (pet) =>
          (!params.species || pet.species === params.species) &&
          /////////////////////////////////////
          (!params.postalCode ||
            !params.lat ||
            !params.lon ||
            !params.distance ||
            haversineFormula(+params.lat, +params.lon, +pet.lat, +pet.lon) <
              +params.distance) &&
          /////////////////////////////////////
          (!params.age || params.age.split(",").includes(pet.age)) &&
          (!params.sex || params.sex.split(",").includes(pet.sex)) &&
          (!params.size || params.size.split(",").includes(pet.size)),
      );
      setPets(filteredPets);
      setIsLoading(false);
    };
    getPets();
  }, [params]);

  if (isLoading) return <LoadingPets />;

  if (pets.length === 0)
    return (
      <div>
        <p>There are no pets with this parameters.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 bg-gray-200 p-4">
      {pets.map((pet) => (
        <div
          className="flex flex-col items-center justify-center bg-gray-300 p-4"
          key={pet.id}
        >
          <div className="aspect-square w-32 bg-gray-400" />
          <p>{pet.name}</p>
          <p>{pet.species}</p>
          <p>{pet.age}</p>
          <p>{pet.sex}</p>
          <p>{pet.size}</p>
          {params.postalCode && params.lat && params.lon && (
            <p>
              {Math.round(
                haversineFormula(+params.lat, +params.lon, +pet.lat, +pet.lon),
              )}{" "}
              Km from you
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
