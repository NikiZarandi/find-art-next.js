import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { number, z } from 'zod';
import { createPainting, Painting } from '../../../database/paintings';
import { getUserBySessionToken } from '../../../database/users';

const artType = z.object({
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  userId: z.number(),
  categoriesId: z.string(),
});

export type PaintingsResponseBodyPost =
  | {
      error: string;
    }
  | {
      painting: Painting;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<PaintingsResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const body = await request.json();
  const result = paintingType.safeParse(body);

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

  const newPainting = await createPainting(
    result.data.name,
    result.data.imageUrl,
    result.data.description,
    result.data.userId,
    Number(result.data.categoriesId),
  );

  if (!newPainting) {
    return NextResponse.json(
      { error: 'painting not created!' },
      { status: 500 },
    );
  }
  return NextResponse.json({ painting: newPainting });
}
