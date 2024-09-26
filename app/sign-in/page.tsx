import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

export default async function Page({
  searchParams,
}: {
  searchParams: { redirectTo: string };
}) {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="px-4">
      <section className="mx-auto flex w-full max-w-[400px] flex-col items-center gap-12 rounded-lg border p-6 shadow-md">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold">Sign in</h2>
          <p>Choose your preferred sign in method</p>
        </div>
        <div className="flex w-full flex-col gap-4">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: searchParams.redirectTo });
            }}
          >
            <button
              className="flex w-full items-center justify-center gap-2 rounded-md border px-2 py-2"
              type="submit"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faGoogle} />
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
            <button
              className="flex w-full items-center justify-center gap-2 rounded-md border px-2 py-2"
              type="submit"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faFacebookF} />
              Sign In with Facebook
            </button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: searchParams.redirectTo });
            }}
          >
            <button
              className="flex w-full items-center justify-center gap-2 rounded-md border px-2 py-2"
              type="submit"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
              Sign In with GitHub
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
