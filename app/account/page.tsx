import type { Metadata } from "next";
import { auth } from "@/auth";
import ProfileForm from "../components/account/ProfileForm";
import Image from "next/image";
import SignOutButton from "@/app/components/UI/SignOutButton";
import SectionContainer from "../components/account/container/SectionContainer";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your account details.",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/sign-in?redirectTo=/account");

  /*
  const [user] = await client
    .db("petsAdoption")
    .collection("users")
    .find({ email: session.user.email })
    .toArray();
  */

  return (
    <SectionContainer title="Profile">
      <div className="mb-8 flex items-center gap-4">
        <Image
          className="rounded-full"
          src={session.user.image}
          alt={"User profile picture"}
          width={100}
          height={100}
        />
        <div>
          <p>Hi {session.user.name},</p>
          <p className="mb-2 text-xl font-semibold">Welcome back!</p>
          <SignOutButton />
        </div>
      </div>
      <ProfileForm sessionUser={session.user} />
    </SectionContainer>
  );
}
