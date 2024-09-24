import ShelterForm from "@/app/components/account/shelter/ShelterForm";
import client from "@/app/lib/db";
import { Shelter } from "@/app/types/types";
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
    <div className="bg-gray-300 p-4">
      <h2 className="mb-6 text-2xl">Shelter Information</h2>
      <ShelterForm shelter={formattedShelter} />
    </div>
  );
}
