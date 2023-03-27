import { cache } from 'react';
import { sql } from './connect';

export type Graphicdesign = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  userId: number;
  categoriesId: number;
};

// get all images
export const getGraphicdesigns = cache(async () => {
  const graphicdesigns = await sql<Graphicdesign[]>`
    SELECT * FROM graphicdesigns
  `;

  return graphicdesigns;
});

export const getGraphicdesignById = cache(async (id: number) => {
  const [art] = await sql<Graphicdesign[]>`
    SELECT
      *
    FROM
      graphicdesigns
    WHERE
      id = ${id}
  `;
  return graphicdesign;
});

export const getGraphicdesignByIdAndSessionToken = cache(
  async (id: number, token: string) => {
    const [art] = await sql<Graphicdesign[]>`
    SELECT
      graphicdesigns.*
    FROM
      graphicdesigns
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
      graphicdesigns.id = ${id}
  `;
    return graphicdesigns;
  },
);

export async function createGraphicdesign(
  name: string,
  imageUrl: string,
  description: string,
  userId: number,
  categoriesId: number,
) {
  const [graphicdesign] = await sql<Graphicdesign[]>`
    INSERT INTO graphicdesigns
      ( name,
       image_url,
       description,
       user_id,
       categories_id)
    VALUES
      (${name},${imageUrl}, ${description}, ${userId},${categoriesId})
    RETURNING *
  `;
  return graphicdesign;
}
export const updateGraphicdesignById = cache(
  async (id: number, name: string) => {
    const [art] = await sql<Graficdesign[]>`
      UPDATE
        graphicdesigns
      SET
        name = ${name},
      WHERE
        id = ${id}
      RETURNING *
    `;
    return graphicdesign;
  },
);
export const deleteGraphicdesignById = cache(async (id: number) => {
  const [graphicdesign] = await sql<Graficdesign[]>`
    DELETE FROM
      graphicdesigns
    WHERE
      id = ${id}
    RETURNING *
  `;
  return graphicdesign;
});
// get images for single user
export const getGraphicdesignsByUserId = cache(async (userId: number) => {
  const graphicdesigns = await sql<Graficdesign[]>`
  SELECT
    *
  FROM
    graphicdesigns
  WHERE
    graphicdesigns.user_id = ${userId}
  `;

  return graphicdesigns;
});

// get single image by id
export const getImageById = cache(async (id: number) => {
  const [Graficdesign] = await sql<Graficdesign[]>`
  SELECT
   *
  FROM
    graphicdesigns
  WHERE
    id = ${id}
  `;

  return getGraphicdesignsByUserId;
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
