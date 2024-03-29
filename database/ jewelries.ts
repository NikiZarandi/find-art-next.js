import { cache } from 'react';
import { sql } from './connect';

export type Jewelry = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  userId: number;
  categoriesId: number;
};

// get all images
export const getJewelries = cache(async () => {
  const jewelries = await sql<Jewelry[]>`
    SELECT * FROM arts WHERE categories_id=4
  `;

  return jewelries;
});

export const getJewelryById = cache(async (id: number) => {
  const [jewelry] = await sql<Jewelry[]>`
    SELECT
      *
    FROM
    jewelries
    WHERE
      id = ${id}
  `;
  return jewelry;
});

export const getJewelryByIdAndSessionToken = cache(
  async (id: number, token: string) => {
    const [jewelry] = await sql<Jewelry[]>`
    SELECT
    jewelries.*
    FROM
    jewelries
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
    jewelries.id = ${id}
  `;
    return jewelry;
  },
);

export async function createJewelry(
  name: string,
  imageUrl: string,
  description: string,
  userId: number,
  categoriesId: number,
) {
  const [jewelry] = await sql<Jewelry[]>`
    INSERT INTO jewelries
      ( name,
       image_url,
       description,
       user_id,
       categories_id)
    VALUES
      (${name},${imageUrl}, ${description}, ${userId},${categoriesId})
    RETURNING *
  `;
  return jewelry;
}
export const updateJewelryById = cache(async (id: number, name: string) => {
  const [jewelry] = await sql<Jewelry[]>`
      UPDATE
      jewelries
      SET
        name = ${name},
      WHERE
        id = ${id}
      RETURNING *
    `;
  return jewelry;
});
export const deleteJewelryById = cache(async (id: number) => {
  const [jewelry] = await sql<Jewelry[]>`
    DELETE FROM
    jewelries
    WHERE
      id = ${id}
    RETURNING *
  `;
  return jewelry;
});
// get images for single user
export const getjewelriesByUserId = cache(async (userId: number) => {
  const jewelries = await sql<Jewelry[]>`
  SELECT
    *
  FROM
  jewelries
  WHERE
  jewelries.user_id = ${userId}
  `;

  return jewelries;
});

// get single image by id
export const getImageById = cache(async (id: number) => {
  const [jewelry] = await sql<Jewelry[]>`
  SELECT
   *
  FROM
    jewelries
  WHERE
    id = ${id}
  `;

  return jewelry;
});
