import { useQueryParams } from "@/app/hooks/useQueryParams";

type Props = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

export default function Sort({ currentPage, pageSize, totalCount }: Props) {
  const { queryParams, setQueryParams } = useQueryParams();

  const startingValue = (currentPage - 1) * pageSize + 1;

  const endingValue =
    currentPage * pageSize < totalCount ? currentPage * pageSize : totalCount;

  return (
    <div className="flex items-center justify-between gap-2 bg-gray-200 p-4">
      <div className="pr-8">
        <p>
          Showing {startingValue} - {endingValue} of {totalCount} pets{" "}
          {queryParams.get("search") && (
            <>
              <span className="mr-2">
                for{" "}
                <span className="font-bold">
                  &quot;{queryParams.get("search")}&quot;
                </span>
              </span>
              <button
                className="bg-gray-300 px-4"
                type="button"
                onClick={() => {
                  setQueryParams({ search: "", page: "1" });
                }}
              >
                Clear Search
              </button>
            </>
          )}
        </p>
      </div>
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select
          name="sort"
          id="sort"
          defaultValue={queryParams.get("sort")?.toString()}
          onChange={(e) => {
            setQueryParams({ sort: e.target.value, page: "1" });
          }}
        >
          <option value="">-</option>
          <option value="youngest">Youngest</option>
          <option value="oldest">Oldest</option>
          {queryParams.get("postalCode") &&
            queryParams.get("lat") &&
            queryParams.get("lon") &&
            queryParams.get("distance") && (
              <>
                <option value="nearest">Nearest</option>
                <option value="farthest">Farthest</option>
              </>
            )}
        </select>
      </div>
    </div>
  );
}
