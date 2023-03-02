import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createArt, getArtsWithLimitAndOffset } from '../../../database/arts';

const artType = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string(),
});

export async function GET(request: NextRequest) {
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

  return NextResponse.json({ animals: arts });
}

export async function POST(request: NextRequest) {
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

  const newArt = await createArt(result.data.name);

  return NextResponse.json({ animal: newArt });
}
