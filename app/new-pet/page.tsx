import { auth } from "@/auth";
import PetForm from "../components/edit-pet/PetForm";
import { Pet } from "../types/types";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/sign-in?redirectTo=/new-pet");

  if (session.user.role !== "admin")
    return <main>You dont have privileges to create a pet.</main>;

  const pet: Pet = {
    _id: "",
    name: "",
    imageUrl: "",
    description: "",
    birthdate: new Date(),
    ownerId: "ivan",
    species: "",
    sex: "",
    size: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    location: { type: "Point", coordinates: [0, 0] },
    adopted: false,
  };

  return (
    <main className="m-auto w-full max-w-[1200px] bg-gray-100 p-4">
      <h1 className="mx-auto mb-4 max-w-[500px] text-3xl">Create Pet</h1>
      <PetForm pet={pet} />
    </main>
  );
}
