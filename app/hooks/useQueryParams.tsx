import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { params, QueryParams } from "../types/types";

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();

  //Create an object from the params array as keys and assign the value from searchParams
  const queryParams: QueryParams = Object.assign(
    {},
    ...params.map((key) => ({ [key]: searchParams.get(key) })),
  );

  const setQueryParams = (newParams: Record<string, string>) => {
    const query = new URLSearchParams();

    //Loop through searchParams using params array to get current params
    params.forEach((param) => {
      searchParams.get(param) &&
        query.set(param, searchParams.get(param)?.toString() || "");
    });

    //Add new params to query
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        query.set(key, newParams[key]);
      } else {
        query.delete(key);
      }
    });

    // Push the new query parameters to the URL
    //Using replace instead of push because when going back to old route, filters are not reset
    router.replace(`${path}?${query.toString()}`);
  };

  return { queryParams, setQueryParams };
}
