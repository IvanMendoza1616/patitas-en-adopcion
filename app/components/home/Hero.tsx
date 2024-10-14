import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faDog } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="px-4">
      <div className="relative m-auto grid max-w-[1200px] grid-cols-1 items-center overflow-hidden rounded-lg bg-primary-light px-8 py-0 md:grid-cols-2">
        <div className="z-10 flex flex-col justify-center gap-4 pb-0 pt-8 sm:pt-16 md:min-w-[450px] md:pb-16 md:pl-16">
          <h1 className="text-5xl font-bold md:text-6xl md:leading-[68px]">
            Find your next best friend!
          </h1>
          <p className="mb-4 text-lg sm:text-xl">
            Adopt a furry friend and change two lives forever - theirs and yours
          </p>
          <div className="mt-4 flex flex-col justify-center gap-4 sm:flex-row sm:gap-8 md:justify-start">
            <Link
              href="/pet-search?species=dog&page=1"
              className="flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-white shadow-md transition ease-in-out hover:bg-primary-hover"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faDog} />
              Find a Dog
            </Link>
            <Link
              href="/pet-search?species=cat&page=1"
              className="flex items-center justify-center gap-2 rounded-md bg-white px-8 py-3 shadow-md transition ease-in-out hover:bg-primary-light-hover"
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faCat} />
              Find a Cat
            </Link>
          </div>
        </div>
        <Image
          src={"/hero.png"}
          width={800}
          height={800}
          className="aspect-square"
          alt="hero image"
        />
      </div>
    </section>
  );
}
