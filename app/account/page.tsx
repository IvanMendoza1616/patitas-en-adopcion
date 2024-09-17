import { auth } from "@/auth";

import ProfileForm from "../components/account/ProfileForm";

export default async function Page() {
  const session = await auth();
  if (!session) return;

  /*
  const [user] = await client
    .db("petsAdoption")
    .collection("users")
    .find({ email: session.user.email })
    .toArray();
  */

  return <ProfileForm sessionUser={session.user} />;
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
