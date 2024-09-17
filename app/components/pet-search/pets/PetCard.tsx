import { Pet } from "@/app/types/types";
import { getAge } from "@/app/utils/formatDate";
import { haversineFormula } from "@/app/utils/haversineFormula";
import { capitalizeFirstLetter } from "@/app/utils/textFormat";
import Link from "next/link";

type Props = {
  pet: Pet;
  userLat: string | null;
  userLon: string | null;
};

export default function ShelterPetCard({ pet, userLat, userLon }: Props) {
  return (
    <Link
      href={`/pet/${pet._id}`}
      className="flex flex-col items-center justify-center bg-gray-300 p-4"
      key={pet._id}
    >
      <img
        src={pet.imageUrl}
        alt={pet.name}
        className="aspect-square w-full object-cover"
      />
      <p className="text-2xl">{pet.name}</p>
      <p>
        {capitalizeFirstLetter(pet.sex)}, {capitalizeFirstLetter(pet.size)}
      </p>
      <p>{getAge(pet.birthdate)}</p>
      {userLat && userLon && (
        <p>
          {Math.floor(
            haversineFormula(
              +userLat,
              +userLon,
              pet.location.coordinates[1],
              pet.location.coordinates[0],
            ),
          )}{" "}
          Km from you
        </p>
      )}
    </Link>
  );
}
