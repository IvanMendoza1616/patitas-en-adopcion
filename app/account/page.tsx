import { auth } from "@/auth";
import ProfileForm from "../components/account/ProfileForm";
import Image from "next/image";
import SignOutButton from "@/app/components/UI/SignOutButton";
import SectionContainer from "../components/account/container/SectionContainer";
import { redirect } from "next/navigation";

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

/*

 <div className="bg-gray-300 p-4">
      <SuccessMessage path="/account" />
      <h2 className="mb-6 text-2xl">Profile Information</h2>
      <form
        action={async (formData: FormData) => {
          "use server";
          const name = formData.get("name");
          await client.db("petsAdoption").collection("users").updateOne(
            {
              email: session.user.email,
            },
            { $set: { name } },
          );
          revalidatePath("/account");
          redirect("/account?success=true");
        }}
        className="flex flex-col gap-4 sm:max-w-[50%]"
      >
        <div className="flex flex-col">
          <p>Email:</p>
          <p>{session.user.email}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name*</label>
          <input
            className="px-2"
            type="text"
            name="name"
            id="name"
            defaultValue={session.user.name}
            required
          />
        </div>
        <button
          className="mt-16 self-start bg-gray-200 px-2 py-1"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
*/
