import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="bg-gray-300 px-2 py-1" type="submit">
        Sign Out
      </button>
    </form>
  );
}
