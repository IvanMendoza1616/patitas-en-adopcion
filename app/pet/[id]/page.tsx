import ProfileContainer from "@/app/components/UI/containers/ProfileContainer";
import client from "@/app/lib/db";
import { getAge, getTimeAgo } from "@/app/utils/formatDate";
import { capitalizeFirstLetter } from "@/app/utils/textFormat";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  //Workaround while models are created
  const [pet] = await client
    .db("petsAdoption")
    .collection("pets")
    .find({ _id: new ObjectId(params.id) })
    .toArray();

  if (!pet)
    return (
      <ProfileContainer>
        <div className="flex h-[300px] items-center justify-center">
          <p>Pet not found</p>
        </div>
      </ProfileContainer>
    );

  const [shelter] = await client
    .db("petsAdoption")
    .collection("shelters")
    .find({ ownerId: pet.ownerId })
    .toArray();

  return (
    <ProfileContainer>
      <div className="flex w-full flex-col gap-2">
        <h2 className="text-2xl font-bold">{pet.name}</h2>
        <div className="flex gap-1 text-sm">
          <CalendarIcon className="w-4" />
          <p className="w-full">
            Posted: {getTimeAgo(pet.createdAt)} | Updated:{" "}
            {getTimeAgo(pet.updatedAt)}
          </p>
        </div>
      </div>
      <img
        src={pet.imageUrl}
        alt={pet.name}
        className="aspect-square w-full rounded-lg object-cover"
      />
      {pet.adopted && (
        <div className="w-full rounded-lg bg-gray-100 px-4 py-2">
          This pet has been adopted
        </div>
      )}

      <div className="flex w-full flex-col gap-8">
        <div className="grid w-full grid-cols-2 gap-y-2">
          <h2 className="col-span-2 mb-2 text-xl font-semibold">
            My Basic Info
          </h2>
          <div>
            <p>Age:</p>
            <p>{getAge(pet.birthdate)}</p>
          </div>
          <div>
            <p>Sex:</p>
            <p>{capitalizeFirstLetter(pet.sex)}</p>
          </div>
          <div>
            <p>Size:</p>
            <p>
              {capitalizeFirstLetter(
                pet.size === "x-large" ? "X-Large" : pet.size,
              )}
            </p>
          </div>
          {shelter && (
            <>
              <div>
                <p>Cared by:</p>
                <Link
                  className="text-blue-500"
                  href={`/shelter/${shelter._id}`}
                >
                  {shelter.name}
                </Link>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <MapPinIcon className="h-5 w-5" />
                <p className="w-full">{shelter.address}</p>
              </div>
            </>
          )}
        </div>
        <div>
          <h2 className="mb-2 text-xl font-semibold">About Me</h2>
          <p className="">{pet.description}</p>
        </div>

        {!pet.adopted && (
          <Link
            className="self-start rounded-md border px-4 py-2"
            href={`/adopt-pet/${params.id}`}
          >
            Adopt {pet.name}
          </Link>
        )}
      </div>
    </ProfileContainer>
  );
}
