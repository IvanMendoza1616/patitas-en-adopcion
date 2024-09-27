import type { Metadata, ResolvingMetadata } from "next";
import PetForm from "@/app/components/edit-pet/PetForm";
import ProfileContainer from "@/app/components/UI/containers/ProfileContainer";
import client from "@/app/lib/db";
import { Pet } from "@/app/types/types";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const [pet] = await client
    .db("petsAdoption")
    .collection("pets")
    .find({ _id: new ObjectId(params.id) })
    .toArray();

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Edit ${pet.name}`,
    openGraph: {
      images: [pet.imageUrl, ...previousImages],
    },
  };
}

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
      <ProfileContainer>
        <div className="flex h-[300px] items-center justify-center">
          <p>Pet not found</p>
        </div>
      </ProfileContainer>
    );

  if (pet.ownerId !== session.user.email)
    return (
      <ProfileContainer>
        <div className="flex h-[300px] items-center justify-center">
          <p>You don&apos;t have permissions to edit this pet</p>
        </div>
      </ProfileContainer>
    );

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
    <ProfileContainer>
      <PetForm pet={formattedPet} />
    </ProfileContainer>
  );
}
