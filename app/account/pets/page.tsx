import type { Metadata } from "next";
import { QueryParams } from "@/app/types/types";
import SearchName from "@/app/components/account/pets/SearchName";
import AdoptedToggle from "@/app/components/account/pets/AdoptedToggle";
import PetsGrid from "@/app/components/UI/PetsGrid";
import Link from "next/link";
import SectionContainer from "@/app/components/account/container/SectionContainer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Pets",
  description:
    "Edit and update information about pets currently available for adoption at your shelter.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: QueryParams;
}) {
  const session = await auth();
  if (!session) redirect("/sign-in?redirectTo=/account/pets");

  if (session.user.role !== "admin")
    return (
      <SectionContainer title="My Pets">
        <div className="flex h-[300px] items-center justify-center">
          <p>You don&apos;t have permissions to access this page</p>
        </div>
      </SectionContainer>
    );

  return (
    <SectionContainer title="My Pets">
      <div className="flex flex-col gap-2">
        <Link
          href="/new-pet"
          className="mr-4 self-end rounded-md border px-4 py-2"
        >
          + Add Pet
        </Link>
        <div className="flex flex-col gap-4 px-4 sm:flex-row sm:justify-between">
          <SearchName />
          <AdoptedToggle />
        </div>
        <PetsGrid shelter params={searchParams} />
      </div>
    </SectionContainer>
  );
}
