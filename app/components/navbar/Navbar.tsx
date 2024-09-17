import Link from "next/link";
import SearchInput from "./SearchInput";
import MobileNavbar from "./MobileNavbar";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="mb-0 shadow-md md:mb-8">
      <nav className="mx-auto grid max-w-[1200px] grid-cols-2 content-center gap-y-10 px-8 py-10 md:grid-cols-3">
        <div>
          <Link href="/">Logo</Link>
        </div>
        {/*
         <ul className="hidden items-center justify-end gap-4 md:order-3 md:flex">
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
        */}
        <div className="hidden items-center justify-end gap-4 md:order-3 md:flex">
          <div className="flex items-center justify-center gap-4">
            <Link href="/pet-search">Search Pets</Link>
            <Link href="/pet-search">About Us</Link>
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
              <Link className="ml-4 bg-gray-100 px-2 py-1" href="/sign-in">
                Sign In
              </Link>
            )}
          </div>
        </div>
        <MobileNavbar />
        <SearchInput />
      </nav>
    </div>
  );
}
