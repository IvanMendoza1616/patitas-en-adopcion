import { Pet } from "@/app/types/types";
import { getAge } from "@/app/utils/formatDate";
import { haversineFormula } from "@/app/utils/haversineFormula";
import { capitalizeFirstLetter } from "@/app/utils/textFormat";
import Link from "next/link";

type Props = {
  pet: Pet;
  userLat: string | null;
  userLon: string | null;
  shelter?: boolean;
};

export default function ShelterPetCard({
  pet,
  userLat,
  userLon,
  shelter,
}: Props) {
  return (
    <Link
      href={`/${shelter ? "edit-pet" : "pet"}/${pet._id}`}
      className="flex flex-col justify-center overflow-hidden rounded-lg border shadow-md"
      key={pet._id}
    >
      <img
        src={pet.imageUrl}
        alt={pet.name}
        className="h-[200px] w-full object-cover"
      />
      <div className="p-4">
        <p className="mb-2 text-xl font-semibold">{pet.name}</p>
        <p>
          {capitalizeFirstLetter(pet.sex)},{" "}
          {capitalizeFirstLetter(pet.size === "x-large" ? "X-Large" : pet.size)}
        </p>
        <p>Age: {getAge(pet.birthdate)}</p>
        {userLat && userLon && (
          <p>
            Distance:{" "}
            {Math.floor(
              haversineFormula(
                +userLat,
                +userLon,
                pet.location.coordinates[1],
                pet.location.coordinates[0],
              ),
            )}{" "}
            Km
          </p>
        )}
      </div>
    </Link>
  );
}
