import { cache } from 'react';
import { sql } from './connect';

export type Painting = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  userId: number;
  categoriesId: number;
};

// get all images
export const getPaintings = cache(async () => {
  const paintings = await sql<Painting[]>`
    SELECT * FROM arts WHERE categories_id=1
  `;

  return paintings;
});

// export const getPaintingById = cache(async (id: number) => {
//   const [painting] = await sql<Painting[]>`
//     SELECT
//       *
//     FROM
//       paintings
//     WHERE
//       id = ${id}
//   `;
//   return painting;
// });

// export const getPaintingByIdAndSessionToken = cache(
//   async (id: number, token: string) => {
//     const [painting] = await sql<Painting[]>`
//     SELECT
//       paintings.*
//     FROM
//       paintings
//     INNER JOIN
//       sessions ON (
//         sessions.token = ${token} AND
//         sessions.expiry_timestamp > now()
//       )
//     WHERE
//       paintings.id = ${id}
//   `;
//     return painting;
//   },
// );

// export async function createPainting(
//   name: string,
//   imageUrl: string,
//   description: string,
//   userId: number,
//   categoriesId: number,
// ) {
//   const [painting] = await sql<Painting[]>`
//     INSERT INTO paintings
//       ( name,
//        image_url,
//        description,
//        user_id,
//        categories_id)
//     VALUES
//       (${name},${imageUrl}, ${description}, ${userId},${categoriesId})
//     RETURNING *
//   `;
//   return painting;
// }
// export const updatePaintingById = cache(async (id: number, name: string) => {
//   const [painting] = await sql<Painting[]>`
//       UPDATE
//         paintings
//       SET
//         name = ${name},
//       WHERE
//         id = ${id}
//       RETURNING *
//     `;
//   return painting;
// });
// export const deletePaintingById = cache(async (id: number) => {
//   const [painting] = await sql<Painting[]>`
//     DELETE FROM
//       paintings
//     WHERE
//       id = ${id}
//     RETURNING *
//   `;
//   return painting;
// });
// // get images for single user
// export const getPaintingssByUserId = cache(async (userId: number) => {
//   const paintings = await sql<Painting[]>`
//   SELECT
//     *
//   FROM
//     paintings
//   WHERE
//   paintings.user_id = ${userId}
//   `;

//   return paintings;
// });

// // get single image by id
// export const getImageById = cache(async (id: number) => {
//   const [painting] = await sql<Painting[]>`
//   SELECT
//    *
//   FROM
//     paintings
//   WHERE
//     id = ${id}
//   `;

//   return painting;
// });
