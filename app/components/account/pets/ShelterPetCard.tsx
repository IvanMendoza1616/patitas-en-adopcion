import { Pet } from "@/app/types/types";
import Link from "next/link";

type Props = {
  pet: Pet;
};

export default function ShelterPetCard({ pet }: Props) {
  return (
    <Link
      href={`/edit-pet/${pet._id}`}
      className="flex flex-col items-center justify-center bg-gray-300 p-4"
    >
      <img
        src={pet.imageUrl}
        alt={pet.name}
        className="aspect-square w-full object-cover"
      />
      <p className="text-2xl">{pet.name}</p>
    </Link>
  );
}
