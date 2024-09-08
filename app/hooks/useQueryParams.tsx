import { useRouter, useSearchParams } from "next/navigation";

/*
search
species
postalCode
lat
lon
distance
age
sex
size

sort
page
*/

export function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setQueryParams = (newParams: Record<string, string>) => {
    const query = new URLSearchParams();
    searchParams.get("search") &&
      query.set("search", searchParams.get("search")?.toString() || "");
    searchParams.get("species") &&
      query.set("species", searchParams.get("species")?.toString() || "");
    searchParams.get("postalCode") &&
      query.set("postalCode", searchParams.get("postalCode")?.toString() || "");
    searchParams.get("lat") &&
      query.set("lat", searchParams.get("lat")?.toString() || "");
    searchParams.get("lon") &&
      query.set("lon", searchParams.get("lon")?.toString() || "");
    searchParams.get("distance") &&
      query.set("distance", searchParams.get("distance")?.toString() || "");
    searchParams.get("age") &&
      query.set("age", searchParams.get("age")?.toString() || "");
    searchParams.get("sex") &&
      query.set("sex", searchParams.get("sex")?.toString() || "");
    searchParams.get("size") &&
      query.set("size", searchParams.get("size")?.toString() || "");
    searchParams.get("sort") &&
      query.set("sort", searchParams.get("sort")?.toString() || "");
    searchParams.get("page") &&
      query.set("page", searchParams.get("page")?.toString() || "");

    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        query.set(key, newParams[key]);
      } else {
        query.delete(key);
      }
    });

    // Push the new query parameters to the URL
    router.replace(`/pet-search?${query.toString()}`);
  };
  return { queryParams: searchParams, setQueryParams };
}
