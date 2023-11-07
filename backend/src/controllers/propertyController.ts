import sql from "../database/db";
import type { PropertyType } from "../types/types";

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

export const insertProperty = async (property: PropertyType) => {
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

export const getProperty = async () => {
  const properties: PropertyType[] = await sql`
    select * from properties
  `;
  return properties;
};
