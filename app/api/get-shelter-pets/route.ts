import client from "@/app/lib/db";
import { QueryParams, params } from "@/app/types/types";
import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongodb"; // MongoDB type
import { auth } from "@/auth";

interface Query {
  ownerId: string;
  name?: { $regex: string; $options: string };
  adopted?: boolean;
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "admin")
    return NextResponse.json({ success: false }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const pageSize = 12;

  //Create an object from the params array as keys and assign the value from searchParams
  const queryParams: QueryParams = Object.assign(
    {},
    ...params.map((key) => ({ [key]: searchParams.get(key) })),
  );

  //Filtering
  const query: Query = { ownerId: session.user.email };

  if (queryParams.searchName) {
    query.name = { $regex: queryParams.searchName, $options: "i" }; // Case-insensitive search
  }

  if (queryParams.adopted) {
    query.adopted = true;
  } else {
    query.adopted = false;
  }

  // Build the query pipeline
  const pipeline: Document[] = [
    { $match: query },
    { $sort: { updatedAt: -1 } },
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
