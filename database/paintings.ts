import { cache } from 'react';
import { sql } from './connect';

export type painting = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  userId: number;
  categoriesId: number;
};

// get all images
export const paintings = cache(async () => {
  const paintings = await sql<painting[]>`
    SELECT * FROM paintings
  `;

  return paintings;
});

export const getPaintingById = cache(async (id: number) => {
  const [painting] = await sql<painting[]>`
    SELECT
      *
    FROM
      paintings
    WHERE
      id = ${id}
  `;
  return paintings;
});

export const getPaintingByIdAndSessionToken = cache(
  async (id: number, token: string) => {
    const [painting] = await sql<painting[]>`
    SELECT
      paintings.*
    FROM
      paintings
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
      paintings.id = ${id}
  `;
    return paintings;
  },
);

export async function createPainting(
  name: string,
  imageUrl: string,
  description: string,
  userId: number,
  categoriesId: number,
) {
  const [art] = await sql<painting[]>`
    INSERT INTO paintings
      ( name,
       image_url,
       description,
       user_id,
       categories_id)
    VALUES
      (${name},${imageUrl}, ${description}, ${userId},${categoriesId})
    RETURNING *
  `;
  return paintings;
}
export const updateArtById = cache(async (id: number, name: string) => {
  const [art] = await sql<painting[]>`
      UPDATE
        paintings
      SET
        name = ${name},
      WHERE
        id = ${id}
      RETURNING *
    `;
  return paintings;
});
export const deleteArtById = cache(async (id: number) => {
  const [art] = await sql<painting[]>`
    DELETE FROM
      paintings
    WHERE
      id = ${id}
    RETURNING *
  `;
  return paintings;
});
// get images for single user
export const getPaintingssByUserId = cache(async (userId: number) => {
  const paintings = await sql<painting[]>`
  SELECT
    *
  FROM
    paintings
  WHERE
  industrialdesigns.user_id = ${userId}
  `;

  return paintings;
});

// get single image by id
export const getImageById = cache(async (id: number) => {
  const [painting] = await sql<painting[]>`
  SELECT
   *
  FROM
    paintings
  WHERE
    id = ${id}
  `;

  return painting;
});

// create an image
// export const createImage = cache(
//   async (artsId: number, userId: number, imageUrl: string, caption: string) => {
//     const [image] = await sql<Image[]>`
//   INSERT INTO images
//     (arts_id, user_id, image_url, caption )
//   VALUES
//     (${artsId}, ${userId}, ${imageUrl}, ${caption} )
//   RETURNING *
//   `;

//     return image;
//   },
// );

// delete image by
// export const deleteImageById = cache(async (id: number) => {
//   const [image] = await sql<Image[]>`
//   DELETE FROM
//     images
//   WHERE
//     id = ${id}
//   RETURNING *
//   `;

//   return image;
// });
