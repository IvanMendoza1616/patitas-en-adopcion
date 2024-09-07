import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gray-100 px-4 py-16">
      <div className="m-auto flex max-w-[1200px] flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col gap-4 bg-gray-200 px-4 py-8 text-center">
          <h1 className="text-5xl font-bold">Adopt your next best friend</h1>
          <p>This page will help you find your companion</p>
        </div>
        <div className="mx-8 flex w-full flex-wrap items-center justify-center gap-16 bg-gray-200 p-8">
          <Link
            href="/pet-search?species=dog"
            className="flex aspect-square w-[300px] items-center justify-center bg-gray-300"
          >
            Adopt a dog
          </Link>
          <Link
            href="/pet-search?species=cat"
            className="flex aspect-square w-[300px] items-center justify-center bg-gray-300"
          >
            Adopt a cat
          </Link>
        </div>
      </div>
    </section>
  );
}
