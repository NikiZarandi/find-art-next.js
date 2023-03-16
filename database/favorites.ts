import { cache } from 'react';
import { sql } from './connect';

export type Favorite = {
  id: number;
  imageUrl: string;
  userId: number;
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
    location_id
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

export type FavoriteWithLocationInfo = {
  favoriteId: number;
  imageId: number;

  userId: number;
};

// export const getFavoriteByIdWithLocationInfo = cache(async (userId: number) => {
//   const favoritesWithLocationInfo = await sql<FavoriteWithLocationInfo[]>`
//   SELECT
//     favorites.id AS favorite_id,
//     locations.id AS location_id,
//     locations.name AS location_name,
//     locations.opening_hours AS location_opening_hours,
//     users.id AS user_id
//   FROM
//     favorites
//   INNER JOIN
//     locations ON favorites.location_id = locations.id
//   INNER JOIN
//     users ON favorites.user_id = users.id
//   WHERE
//     favorites.user_id = ${userId}
//   `;
//   return favoritesWithLocationInfo;
// });
