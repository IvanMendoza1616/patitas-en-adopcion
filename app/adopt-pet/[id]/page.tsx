import type { Metadata } from "next";
import AdoptPetForm from "@/app/components/adopt-pet/AdoptPetForm";
import client from "@/app/lib/db";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Adoption Application",
  description:
    "Complete and submit an adoption application to start the process of welcoming a new pet into your home.",
};

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
    <main className="px-4">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-16 rounded-lg border p-6 shadow-md">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            Adoption Application for {pet.name}
          </h1>
          <p>
            Please fill out all sections of this form to apply for pet adoption.
          </p>
        </div>
        <AdoptPetForm shelterEmail={shelter?.email || "testemail@test.com"} />
      </div>
    </main>
  );
}
