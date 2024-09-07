import Link from "next/link";

export default function Navbar() {
  return (
    <div className="mb-0 shadow-md md:mb-8">
      <nav className="mx-auto flex h-[100px] max-w-[1200px] items-center justify-between px-8">
        <Link href="/">Logo</Link>
        <ul className="flex items-center justify-center gap-4">
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </nav>
    </div>
  );
}
