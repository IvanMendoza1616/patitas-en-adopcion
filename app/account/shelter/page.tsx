import type { Metadata } from "next";
import SectionContainer from "@/app/components/account/container/SectionContainer";
import ShelterForm from "@/app/components/account/shelter/ShelterForm";
import client from "@/app/lib/db";
import { Shelter } from "@/app/types/types";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Shelter",
  description: "Update and manage details about your pet shelter.",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/sign-in?redirectTo=/account/shelter");

  if (session.user.role !== "admin")
    return (
      <SectionContainer title="My Shelter">
        <div className="flex h-[300px] items-center justify-center">
          <p>You don&apos;t have permissions to access this page</p>
        </div>
      </SectionContainer>
    );

  const [shelter] = await client
    .db("petsAdoption")
    .collection("shelters")
    .find({ ownerId: session.user.email })
    .toArray();

  const formattedShelter: Shelter = {
    _id: shelter._id.toString(),
    ownerId: shelter.ownerId,
    imageUrl: shelter.imageUrl,
    name: shelter.name,
    description: shelter.description,
    phone: shelter.phone,
    email: shelter.email,
    facebook: shelter.facebook,
    instagram: shelter.instagram,
    address: shelter.address,
    location: shelter.location,
  };

  return (
    <SectionContainer title="My Shelter">
      <ShelterForm shelter={formattedShelter} />
    </SectionContainer>
  );
}
