import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { redirectTo: string };
}) {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="bg-gray-100 p-4">
      <section className="m-auto flex max-w-[400px] flex-col items-center bg-gray-200 p-4">
        <p className="mb-8">Sign in to continue</p>
        <div className="flex w-full max-w-[200px] flex-col gap-4">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: searchParams.redirectTo });
            }}
          >
            <button className="w-full bg-gray-300 px-2 py-1" type="submit">
              Sign In with Google
            </button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("facebook", {
                redirectTo: searchParams.redirectTo,
              });
            }}
          >
            <button className="w-full bg-gray-300 px-2 py-1" type="submit">
              Sign In with Facebook
            </button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: searchParams.redirectTo });
            }}
          >
            <button className="w-full bg-gray-300 px-2 py-1" type="submit">
              Sign In with GitHub
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
