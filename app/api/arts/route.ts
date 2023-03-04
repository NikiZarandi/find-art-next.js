import { validateTokenWithSecret } from '@/app/util/carf';
import { getArtsWithLimitAndOffset } from '@/database/arts';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserBySessionToken } from '../../../database/users';

const artType = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string(),
  csrfToken: z.string(),
});

export async function GET(request: NextRequest) {
  // this should be a public api method (unprotected)
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  const arts = await getArtsWithLimitAndOffset(limit, offset);

  return NextResponse.json({ arts: arts });
}

export async function POST(request: NextRequest) {
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

  const body = await request.json();

  const result = artType.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties firstName, type and accessory ',
      },
      { status: 400 },
    );
  }

  // validate csrf token to make sure the request happens from my server
  if (!validateTokenWithSecret(user.csrfSecret, result.data.csrfToken)) {
    return NextResponse.json(
      {
        error: 'CSRF token is not valid',
      },
      { status: 400 },
    );
  }

  const newArt = await createArt(result.data.firstName, token.value);

  return NextResponse.json({ art: newArt });
}
