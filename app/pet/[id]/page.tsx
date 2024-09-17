import client from "@/app/lib/db";
import { getAge, getTimeAgo } from "@/app/utils/formatDate";
import { capitalizeFirstLetter } from "@/app/utils/textFormat";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const [pet] = await client
    .db("petsAdoption")
    .collection("pets")
    .find({ _id: new ObjectId(params.id) })
    .toArray();

  if (!pet)
    return (
      <main>
        <p>Pet not found</p>
      </main>
    );

  const [shelter] = await client
    .db("petsAdoption")
    .collection("shelters")
    .find({ ownerId: pet.ownerId })
    .toArray();

  return (
    <main className="m-auto w-full max-w-[1200px] bg-gray-100 p-4">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-8 bg-gray-200 px-4 py-8">
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-3xl">My name is {pet.name}</h1>
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="aspect-square w-full object-cover"
          />
          <p>
            Posted {getTimeAgo(pet.createdAt)}, Updated{" "}
            {getTimeAgo(pet.updatedAt)}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid w-full grid-cols-[auto,1fr] gap-x-10">
            <h2 className="col-span-2 mb-2 text-xl">My Basic Info</h2>
            <p>Age:</p>
            <p>{getAge(pet.birthdate)}</p>
            <p>Sex:</p>
            <p>{capitalizeFirstLetter(pet.sex)}</p>
            <p>Size:</p>
            <p>
              {capitalizeFirstLetter(
                pet.size === "x-large" ? "X-Large" : pet.size,
              )}
            </p>
            {shelter && (
              <>
                <p>Cared by:</p>
                <Link
                  className="text-blue-500"
                  href={`/shelter/${shelter._id}`}
                >
                  {shelter.name}
                </Link>
              </>
            )}
          </div>
          <div>
            <h2 className="mb-2 text-xl">About Me</h2>
            <p className="">{pet.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
