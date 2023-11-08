import postgres from "postgres";
import type { PropertyType } from "../types/types";
import { KEYS } from "../config/keys";

export const sql = postgres({
  host: KEYS.DB_HOST,
  port: Number(KEYS.DB_PORT),
  database: KEYS.DB_NAME,
  username: KEYS.DB_USER,
  password: KEYS.DB_PASSWORD,
});

const createPropertiesTable = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        title TEXT,
        price TEXT,
        locality TEXT,
        images TEXT[]  -- Use an array to store image URLs
      )`;
  } catch (error) {
    console.error("Error creating 'properties' table:", error);
  }
};

export const insertPropertyIntoDatabase = async (property: PropertyType) => {
  const { title, price, locality, images } = property;

  await createPropertiesTable();

  try {
    const insertedProperty = await sql`
        INSERT INTO properties (title, price, locality, images)
        VALUES (${title}, ${price}, ${locality}, ${images})
        RETURNING id
      `;

    return insertedProperty;
  } catch (error) {
    console.error("Error inserting property:", error);
  }
};

export const getPropertyFromDatabase = async (page: number) => {
  const limit = 12;
  const offset = page * limit;

  const properties: PropertyType[] = await sql`
    select * from properties
    LIMIT ${limit} OFFSET ${offset}
  `;

  return properties;
};
