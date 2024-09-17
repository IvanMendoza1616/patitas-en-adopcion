"use client";
export default function Error() {
  return (
    <main className="m-auto w-full max-w-[1200px] bg-gray-100 p-4">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-8 bg-gray-200 px-4 py-8">
        <p>There was an error fetching the pet</p>
      </div>
    </main>
  );
}
