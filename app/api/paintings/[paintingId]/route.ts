import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deletePaintingById,
  getPaintingById,
  Painting,
} from '../../../../database/paintings';
import { getUserBySessionToken } from '../../../../database/users';

const paintingType = z.object({
  name: z.number(),
  imageUrl: z.string(),
  description: z.string(),
  userId: z.number(),
  categoriesId: z.number(),
});

export type PaintingResponseBodyGet =
  | {
      error: string;
    }
  | {
      painting: Painting;
    };

export type PaintingResponseBodyDelete =
  | {
      error: string;
    }
  | {
      painting: Painting;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<PaintingResponseBodyGet>> {
  const paintingId = Number(params.paintingId);

  if (!paintingId) {
    return NextResponse.json(
      { error: 'Image id is not valid' },
      { status: 400 },
    );
  }

  const singlePainting = await getPaintingById(paintingId);

  if (!singlePainting) {
    return NextResponse.json({ error: 'Image not found' }, { status: 400 });
  }

  return NextResponse.json({ painting: singlePainting });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<PaintingResponseBodyDelete>> {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const paintingId = Number(params.paintingId);
  const singlePaintingCheck = await getPaintingById(paintingId);

  if (!paintingId) {
    return NextResponse.json(
      {
        error: 'Image id is not valid',
      },
      { status: 400 },
    );
  }

  if (singlePaintingCheck && singlePaintingCheck.userId === user.id) {
    const onePainting = await deletePaintingById(paintingId);

    if (!onePainting) {
      return NextResponse.json(
        {
          error: 'Image not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ painting: onePainting });
  } else {
    return NextResponse.json(
      { error: 'You cannot delete this painting!' },
      { status: 403 },
    );
  }
}
