import Link from "next/link";
import SearchInput from "./SearchInput";
import MobileNavbar from "./MobileNavbar";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="mb-8 shadow-md">
      <nav className="mx-auto grid max-w-[1200px] grid-cols-3 content-center gap-x-8 gap-y-10 px-8 py-10 md:grid-cols-3">
        <div className="col-span-2 md:col-span-1">
          <Link className="text-2xl font-bold" href="/">
            Adopt a Pet
          </Link>
        </div>
        <div className="hidden items-center justify-end gap-4 md:order-3 md:flex">
          <div className="flex items-center justify-center gap-4">
            <Link href="/pet-search">Search Pets</Link>
            <Link href="">About Us</Link>
            {session ? (
              <Link className="ml-4" href="/account">
                <Image
                  className="rounded-full"
                  src={session.user.image}
                  alt="User profile picture"
                  width={40}
                  height={40}
                />
              </Link>
            ) : (
              <Link
                className="ml-4 rounded-md border px-4 py-2"
                href="/sign-in"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
        <MobileNavbar session={session} />
        <SearchInput />
      </nav>
    </div>
  );
}
