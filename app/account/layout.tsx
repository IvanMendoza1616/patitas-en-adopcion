import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import ActiveLink from "../components/UI/ActiveLink";
import {
  ChartBarIcon,
  HeartIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default async function Admin({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/sign-in?redirectTo=/account");

  const AccountNavigation =
    session.user.role === "admin" ? (
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(150px,1fr))] rounded-lg border shadow-md md:flex md:w-[250px] md:flex-col md:py-4">
        <h2 className="mb-4 hidden px-4 text-xl font-semibold md:block">
          Dashboard
        </h2>
        <ActiveLink href="/account">
          <UserIcon className="w-4" />
          Profile
        </ActiveLink>
        <ActiveLink href="/account/shelter">
          <HomeIcon className="w-4" /> My Shelter
        </ActiveLink>
        <ActiveLink href="/account/pets">
          <HeartIcon className="w-4" /> My Pets
        </ActiveLink>
        <ActiveLink href="/account/analytics">
          <ChartBarIcon className="w-4" /> Analytics
        </ActiveLink>
      </div>
    ) : (
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(150px,1fr))] rounded-lg border shadow-md md:flex md:w-[250px] md:flex-col md:py-4">
        <h2 className="mb-4 hidden px-4 text-xl font-semibold md:block">
          Dashboard
        </h2>
        <ActiveLink href="/account">
          <UserIcon className="w-4" />
          Profile
        </ActiveLink>
      </div>
    );

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 md:flex-row">
      {AccountNavigation}
      {children}
    </main>
  );
}
