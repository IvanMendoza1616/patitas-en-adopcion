import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import ActiveLink from "../components/UI/ActiveLink";
import Image from "next/image";
import SignOutButton from "@/app/components/UI/SignOutButton";

export default async function Admin({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) redirect("/sign-in?redirectTo=/account");

  const AccountNavigation =
    session.user.role === "admin" ? (
      <div className="flex gap-4">
        <ActiveLink href="/account">Profile</ActiveLink>
        <ActiveLink href="/account/shelter">My Shelter</ActiveLink>
        <ActiveLink href="/account/pets">My Pets</ActiveLink>
        <ActiveLink href="/account/analytics">Analytics</ActiveLink>
      </div>
    ) : (
      <div className="flex gap-4">
        <ActiveLink href="/account">Profile</ActiveLink>
      </div>
    );

  return (
    <main className="w-full bg-gray-100 py-4">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4 bg-gray-200 p-4">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full"
            src={session.user.image}
            alt={"User profile picture"}
            width={100}
            height={100}
          />
          <div>
            <p>Hi {session.user.name},</p>
            <p className="mb-2 text-2xl">Welcome back!</p>
            <SignOutButton />
          </div>
        </div>
        {AccountNavigation}
        {children}
      </div>
    </main>
  );
}
