import sql from "../database/db";
import type { PropertyType } from "../types";

export const insertProperty = async (property: PropertyType) => {
  const { title, price, locality } = property;

  const insertedProperty = await sql`
      INSERT INTO properties (title, price, locality)
      VALUES (${title}, ${price}, ${locality})
      RETURNING id
    `;

  const propertyId = insertedProperty[0].id;

  if (property.images && property.images.length > 0) {
    for (const imageURL of property.images) {
      await sql`
          INSERT INTO property_images (property_id, image_url)
          VALUES (${propertyId}, ${imageURL})
        `;
    }
  }

  return insertedProperty;
};

export const getProperties = async () => {
  const properties: PropertyType[] = await sql`
    select * from properties
  `;
  return properties;
};
