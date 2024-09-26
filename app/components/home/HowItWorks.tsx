import {
  ClipboardIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 px-4">
      <div className="m-auto flex max-w-[1200px] flex-col items-center justify-center gap-12 py-16 text-center md:py-32">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border bg-white p-8 shadow-md">
            <p className="absolute left-0 top-0 flex aspect-square w-[40px] items-center justify-center rounded-br-lg bg-black text-white">
              1
            </p>
            <MagnifyingGlassIcon className="w-16 rounded-full bg-gray-100 p-2" />
            <h3 className="text-xl font-bold">Search</h3>
            <p>Browse our available pets and find your perfect match.</p>
          </div>
          <div className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border bg-white p-8 shadow-md">
            <p className="absolute left-0 top-0 flex aspect-square w-[40px] items-center justify-center rounded-br-lg bg-black text-white">
              2
            </p>
            <ClipboardIcon className="w-16 rounded-full bg-gray-100 p-2" />
            <h3 className="text-xl font-bold">Apply</h3>
            <p>Fill out our adoption application and meet your new friend.</p>
          </div>
          <div className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border bg-white p-8 shadow-md">
            <p className="absolute left-0 top-0 flex aspect-square w-[40px] items-center justify-center rounded-br-lg bg-black text-white">
              3
            </p>
            <HomeIcon className="w-16 rounded-full bg-gray-100 p-2" />
            <h3 className="text-xl font-bold">Adopt</h3>
            <p>Welcome your new family member to their forever home.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
