import { signOut } from "@/auth";
import Button from "./Button";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="secondary" type="submit">
        Sign Out
      </Button>
    </form>
  );
}
