import { cache } from 'react';
import { sql } from './connect';

export type Favorite = {
  id: number;
  userId: number;
  imageId: number;
};

// get all favorites for single user
export const getFavorites = cache(async (userId: number) => {
  const favorites = await sql<Favorite[]>`
  SELECT * FROM favorites WHERE favorites.user_id = ${userId}
  `;

  return favorites;
});

// get a single favorite
export const getFavoriteById = cache(async (id: number) => {
  const [favorite] = await sql<Favorite[]>`
  SELECT
    *
  FROM
    favorites
  WHERE
    id = ${id}
  `;

  return favorite;
});

export const getFavoriteByUserAndImage = cache(
  async (userId: number, imageId: number) => {
    const [favorite] = await sql<Favorite[]>`
  SELECT
    user_id,
    image_id
  FROM
    favorites
  WHERE
    user_id = ${userId} AND
    image_id = ${imageId}
  `;

    return favorite;
  },
);

export const createFavorite = cache(async (userId: number, imageId: number) => {
  const [favorite] = await sql<Favorite[]>`
    INSERT INTO favorites
     (image_id, user_id)
    VALUES
      (${imageId}, ${userId})
    RETURNING *
  `;

  return favorite;
});

export const deleteFavoriteById = cache(async (id: number) => {
  const [favorite] = await sql<Favorite[]>`
    DELETE FROM
      favorites
    WHERE
      id = ${id}
    RETURNING *
  `;
  return favorite;
});

export type FavoriteWithImageInfo = {
  favoriteId: number;
  userId: number;
  imageId: number;
};

export const getFavoriteByIdWithImageInfo = cache(async (userId: number) => {
  const FavoritesWithImageInfo = await sql<FavoriteWithImageInfo[]>`
  SELECT
    favorites.id AS favorite_id,
    users.id AS user_id,
    images.id AS image_id,
    images.name AS image_name


  FROM
    favorites
  INNER JOIN
    images ON favorites.image_id = images.id
  INNER JOIN
    users ON favorites.user_id = users.id
  WHERE
    favorites.user_id = ${userId}
  `;
  return FavoritesWithImageInfo;
});
