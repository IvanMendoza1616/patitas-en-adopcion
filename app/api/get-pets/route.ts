import client from "@/app/lib/db";
import { QueryParams, params } from "@/app/types/types";
import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongodb"; // MongoDB type

interface Query {
  adopted?: boolean;
  species?: string;
  $or?: {
    $and: (
      | {
          birthdate: {
            $gte: Date;
            $lte?: undefined;
          };
        }
      | {
          birthdate: {
            $lte: Date;
            $gte?: undefined;
          };
        }
    )[];
  }[];
  sex?: { $in: string[] };
  size?: { $in: string[] };
  location?: {
    $geoWithin: {
      $centerSphere: [[number, number], number];
    };
  };
}

interface Sort {
  birthdate?: number;
  name?: number;
  createdAt?: number;
  updatedAt?: number;
  distance?: number;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageSize = 12;
  const ageRanges = {
    baby: [0, 180], // up to six months
    young: [181, 720], // up to 2 years
    adult: [721, 2520], // up to 7 years
    senior: [2521, 36500], // up to 100 years
  } as Record<string, number[]>;

  //Create an object from the params array as keys and assign the value from searchParams
  const queryParams: QueryParams = Object.assign(
    {},
    ...params.map((key) => ({ [key]: searchParams.get(key) })),
  );

  //Filtering
  const query: Query = {};

  query.adopted = false;

  //Distance
  if (
    queryParams.postalCode &&
    queryParams.lat &&
    queryParams.lon &&
    queryParams.distance
  ) {
    query.location = {
      $geoWithin: {
        $centerSphere: [
          [+queryParams.lon, +queryParams.lat],
          +queryParams.distance / 6378.1,
        ],
      },
    };
    /*
      Alternative to get pets in range, less accurate, uses field added distance from $addFields
      query.distance = { $lt: +queryParams.distance / 111 };
      */
  }

  //Species
  if (queryParams.species) {
    query.species = queryParams.species;
  }

  //Age
  if (queryParams.age) {
    const ageCategories = queryParams.age.split(",");

    const ageQuery = ageCategories.map((age) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - ageRanges[age][1]);
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - ageRanges[age][0]);

      return {
        $and: [
          { birthdate: { $gte: startDate } },
          { birthdate: { $lte: endDate } },
        ],
      };
    });
    query.$or = ageQuery;
  }

  //Sex
  if (queryParams.sex) {
    query.sex = { $in: queryParams.sex.split(",") };
  }

  //Size
  if (queryParams.size) {
    query.size = { $in: queryParams.size.split(",") };
  }

  //Sorting
  const sort: Sort = {};

  if (queryParams.sort) {
    if (queryParams.sort === "youngest") sort.birthdate = -1;
    if (queryParams.sort === "oldest") sort.birthdate = 1;
    if (queryParams.sort === "newest-addition") sort.createdAt = -1;
    if (queryParams.sort === "oldest-addition") sort.createdAt = 1;
    if (queryParams.sort === "nearest") sort.distance = 1;
    if (queryParams.sort === "farthest") sort.distance = -1;
  } else {
    sort.updatedAt = -1;
  }

  // Build the query pipeline
  const pipeline: Document[] = [
    { $match: query },
    { $sort: sort },
    {
      $facet: {
        totalCount: [{ $count: "totalCount" }], // Get the total count of matching documents
        data: [
          {
            $skip: queryParams.page ? (+queryParams.page - 1) * pageSize : 0,
          }, // Apply skip
          { $limit: pageSize }, // Apply limit
        ],
      },
    },
    {
      $project: {
        totalCount: { $arrayElemAt: ["$totalCount.totalCount", 0] }, // Extract the total count
        data: 1, // Include the results
      },
    },
  ];

  //Add field distance and calculate distance
  if (
    queryParams.postalCode &&
    queryParams.lat &&
    queryParams.lon &&
    queryParams.distance
  )
    pipeline.unshift({
      $addFields: {
        distance: {
          $sqrt: {
            $add: [
              {
                $pow: [
                  {
                    $subtract: [
                      { $arrayElemAt: ["$location.coordinates", 0] },
                      +queryParams.lon,
                    ],
                  },
                  2,
                ],
              },
              {
                $pow: [
                  {
                    $subtract: [
                      { $arrayElemAt: ["$location.coordinates", 1] },
                      +queryParams.lat,
                    ],
                  },
                  2,
                ],
              },
            ],
          },
        },
      },
    });

  //Search, added at the beginning of pipeline
  if (queryParams.search)
    pipeline.unshift({
      $search: {
        index: "searchPet",
        text: {
          query: queryParams.search,
          path: {
            wildcard: "*",
          },
        },
      },
    });

  try {
    const [response] = await client
      .db("petsAdoption")
      .collection("pets")
      .aggregate(pipeline)
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: response.data,
        pagination: {
          currentPage: +(queryParams.page || 1),
          totalCount: response.totalCount || 0,
          pageSize,
          totalPages: Math.ceil(response.totalCount / pageSize) || 1,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
