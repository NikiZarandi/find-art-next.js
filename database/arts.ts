import { cache } from 'react';
import { sql } from './connect';

export type Art = {
  id: number;
  name: string;
};

// get all arts
export const getArts = cache(async () => {
  const arts = await sql<Art[]>`
    SELECT * FROM arts
  `;

  return arts;
});

export const getArtsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const arts = await sql<Art[]>`
    SELECT * FROM arts
    Limit ${limit}
    offset ${offset}
  `;

    return arts;
  },
);

// get a single art
export const getArtById = cache(async (id: number) => {
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

// get a single art only if i have a valid session token
export const getArtByIdAndSessionToken = cache(
  async (id: number, token: string) => {
    const [art] = await sql<Art[]>`
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
