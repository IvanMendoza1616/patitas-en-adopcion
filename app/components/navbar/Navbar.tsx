import Link from "next/link";
import SearchInput from "./SearchInput";

export default function Navbar() {
  return (
    <div className="mb-0 shadow-md md:mb-8">
      <nav className="mx-auto grid max-w-[1200px] grid-cols-2 content-center gap-y-10 px-8 py-10 md:grid-cols-3">
        <Link href="/">Logo</Link>
        <ul className="flex items-center justify-end gap-4 md:order-3">
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
        <SearchInput />
      </nav>
    </div>
  );
}
