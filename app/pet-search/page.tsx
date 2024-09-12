import Filters from "../components/pet-search/filters/Filters";
import PetsGrid from "../components/pet-search/pets/PetsGrid";
//import client from "../lib/db";
import { QueryParams } from "../types/types";

export default async function PetSearch({
  searchParams,
}: {
  searchParams: QueryParams;
}) {
  /*
  const db = client.db("petsAdoption").collection("pets");
  db.insertMany([
    {
      name: "Bolillo",
      imageUrl:
        "https://i.natgeofe.com/n/2cf64015-d343-4981-90cd-c528a65812e0/01-stray-dogs-nationalgeographic_1927666_16x9.jpg",
      description:
        "Bolillo is a friendly and energetic dog who loves to run and play. He enjoys being around people, always wagging his tail when someone comes near. His outgoing personality makes him a perfect companion for families with kids or active individuals who enjoy outdoor adventures. Bolillo has a special way of bonding with people and would love nothing more than to find a forever home where he can spread joy and companionship.",
      birthdate: new Date("2022-02-09"),
      ownerId: "ivan",
      species: "dog",
      sex: "male",
      size: "medium",
      createdAt: new Date(),
      updatedAt: new Date(),
      location: {
        type: "Point",
        coordinates: [-100.41220347777778, 20.56928871111111],
      },
    },
  ]);

  console.log("added");
  */

  /*
  const pets = await db
    .find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [-100.41220347777778, 20.56928871111111],
          },
          //$minDistance: 1000,
          $maxDistance: 10000,
        },
      },
    })
    .toArray();
  //const pets = await db.collection("pets").find({}).limit(1).toArray();
  console.log(pets[0].location.coordinates);
  */

  return (
    <main className="m-auto flex w-full max-w-[1200px] flex-col gap-4 bg-gray-100 p-2 md:flex-row md:p-8">
      <Filters />
      <div className="flex w-full flex-col gap-4 md:w-3/4">
        <PetsGrid params={searchParams} />
      </div>
    </main>
  );
}
