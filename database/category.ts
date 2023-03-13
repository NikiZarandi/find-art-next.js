import { cache } from 'react';
import { sql } from './connect';

export type Category = {
  id: number;
  name: string;
};

// get all art
export const getArt = cache(async () => {
  const category = await sql<Category[]>`
    SELECT * FROM category
  `;

  return category;
});

// get a single product
export const getProductById = cache(async (id: number) => {
  if (!id) return undefined;
  const [category] = await sql<Category[]>`
    SELECT
      *
    FROM
      category
    WHERE
      id = ${id}
  `;
  return category;
});
