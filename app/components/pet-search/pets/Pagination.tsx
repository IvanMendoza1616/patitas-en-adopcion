import { useQueryParams } from "@/app/hooks/useQueryParams";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  const { setQueryParams } = useQueryParams();

  const pagesGenerated = 1;

  const calcStart =
    currentPage === totalPages
      ? currentPage - pagesGenerated - 1
      : currentPage - pagesGenerated;
  const calcStop =
    currentPage === 1
      ? currentPage + pagesGenerated + 1
      : currentPage + pagesGenerated;

  const start = calcStart < 1 ? 1 : calcStart;
  const stop = calcStop + 1 > totalPages + 1 ? totalPages + 1 : calcStop + 1;

  return (
    <div className="flex items-center justify-center gap-2 bg-gray-200 p-4">
      <button
        disabled={currentPage === 1}
        className={`flex aspect-square w-[30px] items-center justify-center ${currentPage === 1 ? "bg-gray-100" : "bg-gray-300"}`}
        onClick={() => {
          setQueryParams({ page: (currentPage - 1).toString() });
        }}
      >
        <ChevronLeftIcon className="w-5" />
      </button>
      {calcStart > 1 && (
        <>
          <button
            className={`flex aspect-square w-[30px] items-center justify-center ${currentPage === 1 ? "bg-gray-100" : "bg-gray-300"}`}
            onClick={() => {
              setQueryParams({ page: "1" });
            }}
          >
            1
          </button>
          {calcStart > 2 && (
            <p className="flex aspect-square w-[10px] items-center justify-center">
              ...
            </p>
          )}
        </>
      )}
      {Array.from({ length: stop - start }, (_, index) => (
        <button
          disabled={start + index === currentPage}
          className={`aspect-square w-[30px] items-center justify-center md:flex ${start + index === currentPage ? "bg-gray-100" : "bg-gray-300"}`}
          key={start + index}
          onClick={() => {
            setQueryParams({ page: (start + index).toString() });
          }}
        >
          {start + index}
        </button>
      ))}
      {calcStop < totalPages && (
        <>
          {calcStop < totalPages - 1 && (
            <p className="flex aspect-square w-[10px] items-center justify-center">
              ...
            </p>
          )}
          <button
            className={`flex aspect-square w-[30px] items-center justify-center ${currentPage === totalPages ? "bg-gray-100" : "bg-gray-300"}`}
            onClick={() => {
              setQueryParams({ page: totalPages.toString() });
            }}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        disabled={currentPage === totalPages}
        className={`flex aspect-square w-[30px] items-center justify-center ${currentPage === totalPages ? "bg-gray-100" : "bg-gray-300"}`}
        onClick={() => {
          setQueryParams({ page: (currentPage + 1).toString() });
        }}
      >
        <ChevronRightIcon className="w-5" />
      </button>
    </div>
  );
}
