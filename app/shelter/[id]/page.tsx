import client from "@/app/lib/db";
import { ObjectId } from "mongodb";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const [shelter] = await client
    .db("petsAdoption")
    .collection("shelters")
    .find({ _id: new ObjectId(params.id) })
    .toArray();

  if (!shelter)
    return (
      <main>
        <p>Shelter not found</p>
      </main>
    );

  return (
    <main className="m-auto w-full max-w-[1200px] bg-gray-100 p-4">
      <div className="mx-auto flex w-full max-w-[800px] flex-col justify-center gap-8 bg-gray-200 px-4 py-8">
        <h1 className="text-3xl">{shelter.name}</h1>
        {shelter.imageUrl && (
          <Image
            src={shelter.imageUrl}
            alt={shelter.name}
            width={200}
            height={200}
            className="aspect-square object-cover"
          />
        )}
        <div>
          <p>Description:</p>
          <p>{shelter.description}</p>
        </div>
        <div>
          <p>Phone:</p>
          <p>{shelter.phone}</p>
        </div>
        <div>
          <p>Email:</p>
          <p>{shelter.email}</p>
        </div>
        <div>
          <p>Address:</p>
          <p>{shelter.address}</p>
        </div>
        <div className="flex gap-4">
          {shelter.facebook && (
            <a target="_blank" rel="noreferrer" href={shelter.facebook}>
              Facebook
            </a>
          )}
          {shelter.instagram && (
            <a target="_blank" rel="noreferrer" href={shelter.instagram}>
              Instagram
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
