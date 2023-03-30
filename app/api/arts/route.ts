import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { number, z } from 'zod';
import { Art, createArt } from '../../../database/arts';
import { getUserBySessionToken } from '../../../database/users';

const artType = z.object({
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  userId: z.number(),
  categoriesId: z.number(),
});

export type ArtsResponseBodyPost =
  | {
      error: string;
    }
  | {
      art: Art;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ArtsResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const body = await request.json();
  const result = artType.safeParse(body);

  console.log(result);

  if (!result.success) {
    console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties caption & image url',
      },
      { status: 400 },
    );
  }

  const newArt = await createArt(
    result.data.name,
    result.data.imageUrl,
    result.data.description,
    result.data.userId,
    Number(result.data.categoriesId),
  );

  if (!newArt) {
    return NextResponse.json({ error: 'art not created!' }, { status: 500 });
  }
  return NextResponse.json({ art: newArt });
}
