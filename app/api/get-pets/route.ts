/*
import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../lib/db"; // Assuming you have a DB setup
import { haversineFormula } from "../../utils/haversineFormula"; // Your distance function

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    page = 1,
    pageSize = 10,
    age,
    sex,
    size,
    distance,
    userLat,
    userLon,
  } = req.query;

  const offset = (Number(page) - 1) * Number(pageSize);

  try {
    // Start building the SQL query
    let query = `SELECT * FROM pets WHERE TRUE`; // Use WHERE TRUE as a base to append filters

    // Apply age filter if present
    if (age) {
      query += ` AND age = '${age}'`;
    }

    // Apply sex filter if present
    if (sex) {
      query += ` AND sex = '${sex}'`;
    }

    // Apply size filter if present
    if (size) {
      query += ` AND size = '${size}'`;
    }

    // Fetch all pets first (to apply distance filtering later)
    const petsResult = await pool.query(`${query} LIMIT $1 OFFSET $2`, [
      Number(pageSize),
      offset,
    ]);
    let pets = petsResult.rows;

    // If distance filter is applied, use the Haversine formula to filter
    if (distance && userLat && userLon) {
      pets = pets.filter((pet) => {
        const petLat = parseFloat(pet.lat); // Assuming latitude is stored as 'lat'
        const petLon = parseFloat(pet.lon); // Assuming longitude is stored as 'lon'
        const petDistance = haversineFormula(
          Number(userLat),
          Number(userLon),
          petLat,
          petLon,
        );
        return petDistance <= Number(distance); // Filter pets within the distance
      });
    }

    // Pagination metadata
    const totalItems = pets.length;
    const totalPages = Math.ceil(totalItems / Number(pageSize));

    res.status(200).json({
      data: pets, // Paginated and filtered pets data
      pagination: {
        currentPage: Number(page),
        pageSize: Number(pageSize),
        totalCount: totalItems,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
*/
