import AdoptPetForm from "@/app/components/adopt-pet/AdoptPetForm";
import client from "@/app/lib/db";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) redirect(`/sign-in?redirectTo=/adopt-pet/${params.id}`);

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
      <h1 className="mb-6 text-3xl">Adoption form for {pet.name}</h1>
      <AdoptPetForm shelterEmail={shelter?.email || "testemail@test.com"} />
    </main>
  );
}
