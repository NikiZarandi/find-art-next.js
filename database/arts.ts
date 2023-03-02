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
export const getArts = cache(async () => {
  const arts = await sql<Art[]>`
    SELECT * FROM arts
  `;

  return arts;
});

// export const getArtsWithLimitAndOffset = cache(
//   async (limit: number, offset: number) => {
//     const arts = await sql<Art[]>`
//     SELECT * FROM arts
//     Limit ${limit}
//     offset ${offset}
//   `;

//     return arts;
//   },
// );

// get a single art
export const getArtsById = cache(async (id: number) => {
  if (!id) return undefined;
  const [art] = await sql<Art[]>`
    SELECT
      *
    FROM
      arts
    WHERE
      id = ${id}
  `;
  return art;
});
