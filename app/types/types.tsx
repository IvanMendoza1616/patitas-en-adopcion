export type SearchParams = {
  search?: string;
  species?: string;
  postalCode?: string;
  lat?: string;
  lon?: string;
  distance?: string;
  age?: string;
  sex?: string;
  size?: string;
  sort?: string;
  page?: string;
};

export type Pet = {
  id: number;
  name: string;
  image: string;
  birthdate: string;
  ownerId: string;
  species: string;
  age: string;
  sex: string;
  size: string;
  lat: string;
  lon: string;
};
