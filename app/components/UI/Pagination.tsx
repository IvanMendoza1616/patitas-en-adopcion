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
    <div className="flex items-center justify-center gap-2 p-4">
      <button
        type="button"
        disabled={currentPage === 1}
        className="flex aspect-square w-[40px] items-center justify-center rounded-md border"
        onClick={() => {
          setQueryParams({ page: (currentPage - 1).toString() });
        }}
      >
        <ChevronLeftIcon
          className={`w-4 ${currentPage === 1 ? "text-gray-400" : ""}`}
        />
      </button>
      {start > 1 && (
        <>
          <button
            type="button"
            className="flex aspect-square w-[40px] items-center justify-center rounded-md border"
            onClick={() => {
              setQueryParams({ page: "1" });
            }}
          >
            1
          </button>
          {start > 2 && (
            <p className="flex aspect-square w-[40px] items-center justify-center rounded-md border text-gray-400">
              ···
            </p>
          )}
        </>
      )}
      {Array.from({ length: stop - start + 1 }, (_, index) => (
        <button
          type="button"
          disabled={start + index === currentPage}
          className={`aspect-square w-[40px] items-center justify-center rounded-md border md:flex ${start + index === currentPage ? "bg-primary-light border-primary-light" : ""}`}
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
            <p className="flex aspect-square w-[40px] items-center justify-center rounded-md border text-gray-400">
              ···
            </p>
          )}
          <button
            type="button"
            className="flex aspect-square w-[40px] items-center justify-center rounded-md border"
            onClick={() => {
              setQueryParams({ page: totalPages.toString() });
            }}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        type="button"
        disabled={currentPage === totalPages}
        className="flex aspect-square w-[40px] items-center justify-center rounded-md border"
        onClick={() => {
          setQueryParams({ page: (currentPage + 1).toString() });
        }}
      >
        <ChevronRightIcon
          className={`w-4 ${currentPage === totalPages ? "text-gray-400" : ""}`}
        />
      </button>
    </div>
  );
}
