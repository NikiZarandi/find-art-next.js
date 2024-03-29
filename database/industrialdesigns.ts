import { cache } from 'react';
import { sql } from './connect';

export type Industrialdesign = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  userId: number;
  categoriesId: number;
};

// get all images
export const getIndustrialdesigns = cache(async () => {
  const industrialdesigns = await sql<Industrialdesign[]>`
    SELECT * FROM arts WHERE categories_id=3
  `;

  return industrialdesigns;
});

export const getIndustrialdesignById = cache(async (id: number) => {
  const [Industrialdesign] = await sql<Industrialdesign[]>`
    SELECT
      *
    FROM
    Industrialdesigns
    WHERE
      id = ${id}
  `;
  return Industrialdesign;
});

export const getIndustrialdesignByIdAndSessionToken = cache(
  async (id: number, token: string) => {
    const [industrialdesigns] = await sql<Industrialdesign[]>`
    SELECT
    industrialdesigns.*
    FROM
    industrialdesigns
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
    industrialdesigns.id = ${id}
  `;
    return industrialdesigns;
  },
);

export async function createArt(
  name: string,
  imageUrl: string,
  description: string,
  userId: number,
  categoriesId: number,
) {
  const [industrialdesign] = await sql<Industrialdesign[]>`
    INSERT INTO industrialdesignss
      ( name,
       image_url,
       description,
       user_id,
       categories_id)
    VALUES
      (${name},${imageUrl}, ${description}, ${userId},${categoriesId})
    RETURNING *
  `;
  return industrialdesign;
}
export const updateindustrialdesignById = cache(
  async (id: number, name: string) => {
    const [industrialdesign] = await sql<Industrialdesign[]>`
      UPDATE
      industrialdesigns
      SET
        name = ${name},
      WHERE
        id = ${id}
      RETURNING *
    `;
    return industrialdesign;
  },
);
export const deleteindustrialdesignById = cache(async (id: number) => {
  const [industrialdesign] = await sql<Industrialdesign[]>`
    DELETE FROM
    industrialdesigns
    WHERE
      id = ${id}
    RETURNING *
  `;
  return industrialdesign;
});
// get images for single user
export const getIndustrialdesignsByUserId = cache(async (userId: number) => {
  const industrialdesigns = await sql<Industrialdesign[]>`
  SELECT
    *
  FROM
  industrialdesigns
  WHERE
  industrialdesigns.user_id = ${userId}
  `;

  return industrialdesigns;
});

// get single image by id
export const getImageById = cache(async (id: number) => {
  const [industrialdesign] = await sql<Industrialdesign[]>`
  SELECT
   *
  FROM
  industrialdesigns
  WHERE
    id = ${id}
  `;

  return industrialdesign;
});
