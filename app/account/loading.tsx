export default function Loading() {
  return (
    <div className="flex w-full max-w-[848px] animate-pulse flex-col gap-4">
      <div className="h-[28px] w-1/4 bg-gray-100" />
      <div className="flex flex-col gap-8 rounded-lg border p-6 shadow-md">
        <div className="h-[30px] w-1/3 bg-gray-100" />
        <div className="h-[30px] w-2/3 bg-gray-100" />
        <div className="h-[30px] w-1/3 bg-gray-100" />
        <div className="h-[30px] w-1/3 bg-gray-100" />
        <div className="h-[30px] w-2/3 bg-gray-100" />
        <div className="h-[30px] w-1/3 bg-gray-100" />
        <div className="h-[30px] w-1/3 bg-gray-100" />
        <div className="h-[30px] w-2/3 bg-gray-100" />
      </div>
    </div>
  );
}
