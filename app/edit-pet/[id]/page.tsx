import PetForm from "@/app/components/edit-pet/PetForm";
import client from "@/app/lib/db";
import { Pet } from "@/app/types/types";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) redirect(`/sign-in?redirectTo=/edit-pet/${params.id}`);

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

  if (pet.ownerId !== session.user.email)
    return <main>You are not the owner of this pet</main>;

  const formattedPet: Pet = {
    _id: pet._id.toString(),
    name: pet.name,
    imageUrl: pet.imageUrl,
    description: pet.description,
    birthdate: new Date(pet.birthdate),
    ownerId: pet.ownerId,
    species: pet.species,
    sex: pet.sex,
    size: pet.size,
    createdAt: new Date(pet.createdAt),
    updatedAt: new Date(pet.updatedAt),
    location: pet.location,
    adopted: pet.adopted,
  };

  return (
    <main className="m-auto w-full max-w-[1200px] bg-gray-100 p-4">
      <h1 className="mx-auto mb-4 max-w-[500px] text-3xl">Edit {pet.name}</h1>
      <PetForm pet={formattedPet} />
    </main>
  );
}
