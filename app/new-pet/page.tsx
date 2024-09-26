import { auth } from "@/auth";
import PetForm from "../components/edit-pet/PetForm";
import { Pet } from "../types/types";
import { redirect } from "next/navigation";
import ProfileContainer from "../components/UI/containers/ProfileContainer";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/sign-in?redirectTo=/new-pet");

  if (session.user.role !== "admin")
    return (
      <ProfileContainer>
        <div className="flex h-[300px] items-center justify-center">
          <p>You don&apos;t have permissions to create a pet</p>
        </div>
      </ProfileContainer>
    );

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
    <ProfileContainer>
      <PetForm pet={pet} />
    </ProfileContainer>
  );
}
