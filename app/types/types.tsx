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
  _id: number;
  name: string;
  imageUrl: string;
  description: string;
  birthdate: Date;
  ownerId: string;
  species: string;
  sex: string;
  size: string;
  createdAt: Date;
  updatedAt: Date;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
};
