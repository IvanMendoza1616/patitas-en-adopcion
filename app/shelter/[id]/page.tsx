import type { Metadata, ResolvingMetadata } from "next";
import client from "@/app/lib/db";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import ProfileContainer from "@/app/components/UI/containers/ProfileContainer";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const [shelter] = await client
    .db("petsAdoption")
    .collection("shelters")
    .find({ _id: new ObjectId(params.id) })
    .toArray();

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: shelter.name,
    openGraph: {
      images: [shelter.imageUrl, ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const [shelter] = await client
    .db("petsAdoption")
    .collection("shelters")
    .find({ _id: new ObjectId(params.id) })
    .toArray();

  if (!shelter)
    return (
      <ProfileContainer>
        <div className="flex h-[300px] items-center justify-center">
          <p>Shelter not found</p>
        </div>
      </ProfileContainer>
    );

  return (
    <ProfileContainer>
      <div className="flex items-center gap-4">
        {shelter.imageUrl && (
          <Image
            src={shelter.imageUrl}
            alt={shelter.name}
            width={100}
            height={100}
            className="aspect-square rounded-full border object-cover shadow-md"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold">{shelter.name}</h2>
          <p>{shelter.address}</p>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold">About Us</h3>
        <p>{shelter.description}</p>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="mb-1 text-xl font-semibold">Contact Information</h3>
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-4" />
          <p>{shelter.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <EnvelopeIcon className="w-4" />
          <a target="_blank" rel="noreferrer" href={`mailto:${shelter.email}`}>
            {shelter.email}
          </a>
        </div>
      </div>
      {(shelter.facebook || shelter.instagram) && (
        <div>
          <h3 className="mb-2 text-xl font-semibold">Follow Us</h3>
          <div className="flex gap-4">
            {shelter.facebook && (
              <a
                className="flex items-center justify-center rounded-md border px-3 py-1"
                target="_blank"
                rel="noreferrer"
                href={shelter.facebook}
              >
                <FontAwesomeIcon className="h-4 w-4" icon={faFacebookF} />
              </a>
            )}
            {shelter.instagram && (
              <a
                className="rounded-md border px-3 py-2"
                target="_blank"
                rel="noreferrer"
                href={shelter.instagram}
              >
                <FontAwesomeIcon className="h-5 w-5" icon={faInstagram} />
              </a>
            )}
          </div>
        </div>
      )}
    </ProfileContainer>
  );
}
