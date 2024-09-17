"use client";
import { useQueryParams } from "@/app/hooks/useQueryParams";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  const { setQueryParams } = useQueryParams();

  const pagesGeneratedAround = 1;

  //Get start and stop without considering min and max pages possible
  const tempStart =
    currentPage === totalPages
      ? currentPage - pagesGeneratedAround - 1
      : currentPage - pagesGeneratedAround;
  const tempStop =
    currentPage === 1
      ? currentPage + pagesGeneratedAround + 1
      : currentPage + pagesGeneratedAround;

  //Delimit start and stop
  const start = tempStart < 1 ? 1 : tempStart;
  const stop = tempStop > totalPages ? totalPages : tempStop;

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
      {start > 1 && (
        <>
          <button
            className={`flex aspect-square w-[30px] items-center justify-center ${currentPage === 1 ? "bg-gray-100" : "bg-gray-300"}`}
            onClick={() => {
              setQueryParams({ page: "1" });
            }}
          >
            1
          </button>
          {start > 2 && (
            <p className="flex aspect-square w-[10px] items-center justify-center">
              ...
            </p>
          )}
        </>
      )}
      {Array.from({ length: stop - start + 1 }, (_, index) => (
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
      {stop < totalPages && (
        <>
          {stop < totalPages - 1 && (
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
