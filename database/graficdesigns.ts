import { cache } from 'react';
import { sql } from './connect';

export type Graficdesign = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  userId: number;
  categoriesId: number;
};

// get all images
export const getArts = cache(async () => {
  const arts = await sql<Graficdesign[]>`
    SELECT * FROM arts
  `;

  return arts;
});

export const getArtById = cache(async (id: number) => {
  const [art] = await sql<Graficdesign[]>`
    SELECT
      *
    FROM
      arts
    WHERE
      id = ${id}
  `;
  return art;
});

export const getArtByIdAndSessionToken = cache(
  async (id: number, token: string) => {
    const [art] = await sql<Graficdesign[]>`
    SELECT
      arts.*
    FROM
      arts
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
      arts.id = ${id}
  `;
    return art;
  },
);

export async function createArt(
  name: string,
  imageUrl: string,
  description: string,
  userId: number,
  categoriesId: number,
) {
  const [art] = await sql<Graficdesign[]>`
    INSERT INTO arts
      ( name,
       image_url,
       description,
       user_id,
       categories_id)
    VALUES
      (${name},${imageUrl}, ${description}, ${userId},${categoriesId})
    RETURNING *
  `;
  return art;
}
export const updateArtById = cache(async (id: number, name: string) => {
  const [art] = await sql<Graficdesign[]>`
      UPDATE
        arts
      SET
        name = ${name},
      WHERE
        id = ${id}
      RETURNING *
    `;
  return art;
});
export const deleteArtById = cache(async (id: number) => {
  const [art] = await sql<Graficdesign[]>`
    DELETE FROM
      arts
    WHERE
      id = ${id}
    RETURNING *
  `;
  return art;
});
// get images for single user
export const getArtssByUserId = cache(async (userId: number) => {
  const arts = await sql<Graficdesign[]>`
  SELECT
    *
  FROM
    arts
  WHERE
    arts.user_id = ${userId}
  `;

  return arts;
});

// get single image by id
export const getImageById = cache(async (id: number) => {
  const [art] = await sql<Graficdesign[]>`
  SELECT
   *
  FROM
    arts
  WHERE
    id = ${id}
  `;

  return art;
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
