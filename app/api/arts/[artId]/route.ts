import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Art, deleteArtById, getArtById } from '../../../../database/arts';
import { getUserBySessionToken } from '../../../../database/users';

const artType = z.object({
  name: z.number(),
  imageUrl: z.string(),
  description: z.string(),
  userId: z.number(),
  categoriesId: z.number(),
});

export type ArtResponseBodyGet =
  | {
      error: string;
    }
  | {
      art: Art;
    };

export type ArtResponseBodyDelete =
  | {
      error: string;
    }
  | {
      art: Art;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ArtResponseBodyGet>> {
  const artId = Number(params.artId);

  if (!artId) {
    return NextResponse.json(
      { error: 'Image id is not valid' },
      { status: 400 },
    );
  }

  const singleArt = await getArtById(artId);

  if (!singleArt) {
    return NextResponse.json({ error: 'Image not found' }, { status: 400 });
  }

  return NextResponse.json({ art: singleArt });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ArtResponseBodyDelete>> {
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

  const artId = Number(params.artId);
  const singleArtCheck = await getArtById(artId);

  if (!artId) {
    return NextResponse.json(
      {
        error: 'Image id is not valid',
      },
      { status: 400 },
    );
  }

  if (singleArtCheck && singleArtCheck.userId === user.id) {
    const oneArt = await deleteArtById(artId);

    if (!oneArt) {
      return NextResponse.json(
        {
          error: 'Image not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ art: oneArt });
  } else {
    return NextResponse.json(
      { error: 'You cannot delete this art!' },
      { status: 403 },
    );
  }
}
