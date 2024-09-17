import ShelterForm from "@/app/components/account/shelter/ShelterForm";
import client from "@/app/lib/db";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (!session) return;

  const [shelter] = await client
    .db("petsAdoption")
    .collection("shelters")
    .find({ ownerId: session.user.email })
    .toArray();

  if (!shelter)
    return <div>Error initializing shelter, contact administrator</div>;

  const formattedShelter = {
    name: shelter.name,
    description: shelter.description,
    phone: shelter.phone,
    email: shelter.email,
    facebook: shelter.facebook,
    instagram: shelter.instagram,
  };

  return <ShelterForm shelter={formattedShelter} />;
}
