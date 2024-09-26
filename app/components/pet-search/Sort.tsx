import { useQueryParams } from "@/app/hooks/useQueryParams";
import SelectInput from "../UI/inputs/SelectInput";

type Props = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  isLoading: boolean;
};

export default function Sort({
  currentPage,
  pageSize,
  totalCount,
  isLoading,
}: Props) {
  const { queryParams, setQueryParams } = useQueryParams();

  const startingValue = (currentPage - 1) * pageSize + 1;

  const endingValue =
    currentPage * pageSize < totalCount ? currentPage * pageSize : totalCount;

  return (
    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="order-2 sm:order-1">
        {!isLoading && (
          <div className="flex flex-wrap items-center gap-2">
            <span>
              {totalCount === 0
                ? "No results "
                : `Showing ${startingValue} - ${endingValue} of ${totalCount} pets `}
            </span>

            {queryParams.search && (
              <>
                <span className="mr-2">
                  for{" "}
                  <span className="font-bold">
                    &quot;{queryParams.search}&quot;
                  </span>
                </span>
                <button
                  className="rounded-md border px-4 py-1"
                  type="button"
                  onClick={() => {
                    setQueryParams({ search: "", page: "1" });
                  }}
                >
                  Clear Search
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="order-1 flex items-center gap-2 sm:order-2">
        <label htmlFor="sort">Sort by: </label>
        <SelectInput
          name="sort"
          id="sort"
          defaultValue={queryParams.sort?.toString()}
          onChange={(e) => {
            setQueryParams({ sort: e.target.value, page: "1" });
          }}
        >
          <option value="">-</option>
          <option value="youngest">Youngest</option>
          <option value="oldest">Oldest</option>
          <option value="newest-addition">Newest Addition</option>
          <option value="oldest-addition">Oldest Addition</option>
          {queryParams.postalCode &&
            queryParams.lat &&
            queryParams.lon &&
            queryParams.distance && (
              <>
                <option value="nearest">Nearest</option>
                <option value="farthest">Farthest</option>
              </>
            )}
        </SelectInput>
      </div>
    </div>
  );
}
