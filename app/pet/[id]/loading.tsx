export default function Loading() {
  return (
    <main className="m-auto w-full max-w-[1200px] bg-gray-100 p-4">
      <div className="mx-auto max-w-[500px] bg-gray-200 px-4 py-8">
        <div className="flex w-full animate-pulse flex-col gap-4">
          <div className="h-[40px] w-2/3 bg-gray-300" />
          <div className="aspect-square w-full bg-gray-300" />
          <div className="h-[30px] w-2/3 self-start bg-gray-300" />
          <div className="h-[25px] w-full bg-gray-300" />
          <div className="h-[25px] w-11/12 self-start bg-gray-300" />
          <div className="h-[25px] w-full bg-gray-300" />
          <div className="h-[25px] w-11/12 self-start bg-gray-300" />
        </div>
      </div>
    </main>
  );
}
