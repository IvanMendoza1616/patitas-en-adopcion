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
  "searchName",
  "adopted",
] as const;

export type QueryParamsKeys = (typeof params)[number];

export type QueryParams = Record<QueryParamsKeys, string | null>;

export type Pet = {
  _id: string;
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
  adopted: boolean;
};

export type Shelter = {
  _id: string;
  ownerId: string;
  name: string;
  imageUrl: string;
  description: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
};

export type DataFetchedType = {
  success: boolean;
  data: Pet[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
};
