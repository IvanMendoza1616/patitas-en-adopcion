import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faDog } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  return (
    <section className="px-4">
      <div className="relative m-auto flex max-w-[1200px] flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-gray-200 px-8 py-16 text-center md:py-32">
        <h1 className="text-5xl font-bold">Find your next best friend</h1>
        <p className="mb-4 text-xl">
          Adopt a furry friend and change two lives forever - theirs and yours
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-8">
          <Link
            href="/pet-search?species=dog&page=1"
            className="flex items-center justify-center gap-2 rounded-md bg-black px-8 py-3 text-white shadow-md"
          >
            <FontAwesomeIcon className="h-4 w-4" icon={faDog} />
            Find a Dog
          </Link>
          <Link
            href="/pet-search?species=cat&page=1"
            className="flex items-center justify-center gap-2 rounded-md bg-white px-8 py-3 shadow-md"
          >
            <FontAwesomeIcon className="h-4 w-4" icon={faCat} />
            Find a Cat
          </Link>
        </div>
      </div>
    </section>
  );
}
