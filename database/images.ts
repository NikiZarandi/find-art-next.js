import { cache } from 'react';
import { number } from 'zod';
import { sql } from './connect';

export type Image = {
  id: number;
  artsId: number;
  userId: number;
  imageUrl: string;
  caption: string;
};

// get all images
export const getImages = cache(async () => {
  const images = await sql<Image[]>`
  SELECT * FROM images
  `;

  return images;
});

// get images for single user
export const getImagesByUserId = cache(async (userId: number) => {
  const images = await sql<Image[]>`
  SELECT
    *
  FROM
    images
  WHERE
    images.user_id = ${userId}
  `;

  return images;
});

// get single image by id
export const getImageById = cache(async (id: number) => {
  const [image] = await sql<Image[]>`
  SELECT
   *
  FROM
    images
  WHERE
    id = ${id}
  `;

  return image;
});

// create an image
export const createImage = cache(
  async (artsId: number, userId: number, imageUrl: string, caption: string) => {
    const [image] = await sql<Image[]>`
  INSERT INTO images
    (arts_id, user_id, image_url, caption )
  VALUES
    (${artsId}, ${userId}, ${imageUrl}, ${caption} )
  RETURNING *
  `;

    return image;
  },
);

// delete image by
export const deleteImageById = cache(async (id: number) => {
  const [image] = await sql<Image[]>`
  DELETE FROM
    images
  WHERE
    id = ${id}
  RETURNING *
  `;

  return image;
});
