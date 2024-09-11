export const params = [
  "search",
  "species",
  "postalCode",
  "lat",
  "lon",
  "distance",
  "age",
  "sex",
  "size",
  "sort",
  "page",
] as const;

export type QueryParamsKeys = (typeof params)[number];

export type QueryParams = Record<QueryParamsKeys, string | null>;

export type Pet = {
  id: number;
  name: string;
  image: string;
  description: string;
  birthdate: string;
  ownerId: string;
  species: string;
  sex: string;
  size: string;
  lat: number;
  lon: number;
  createdAt: number;
  updatedAt: number;
};
