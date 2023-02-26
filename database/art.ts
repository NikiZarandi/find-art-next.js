import { cache } from 'react';
import { sql } from './connect';

export type Art = {
  id: number;
  name: string;
  discription: number;
  userId: number;
  categoryId: number;
  imageURL: string | null;
};

// get all art
export const getArt = cache(async () => {
  const art = await sql<Art[]>`
    SELECT * FROM art
  `;

  return art;
});

// get a single product
export const getProductById = cache(async (id: number) => {
  if (!id) return undefined;
  const [art] = await sql<Art[]>`
    SELECT
      *
    FROM
      art
    WHERE
      id = ${id}
  `;
  return art;
});
