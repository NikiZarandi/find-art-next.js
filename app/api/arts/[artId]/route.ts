import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteArtById,
  getArtById,
  updateArtById,
} from '../../../../database/arts';

const artType = z.object({
  name: z.string(),
  type: z.string(),
  accessory: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const artId = Number(params.artId);

  if (!artId) {
    return NextResponse.json(
      {
        error: 'Art id is not valid',
      },
      { status: 400 },
    );
  }

  const singleArt = await getArtById(artId);

  return NextResponse.json({ art: singleArt });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const artId = Number(params.artId);

  if (!artId) {
    return NextResponse.json(
      {
        error: 'Art id is not valid',
      },
      { status: 400 },
    );
  }

  const singleArt = await deleteArtById(artId);

  return NextResponse.json({ animal: singleArt });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const artId = Number(params.artId);

  if (!artId) {
    return NextResponse.json(
      {
        error: 'Art id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = artType.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        error: 'Request body is missing one of the needed properties name ',
      },
      { status: 400 },
    );
  }

  const newArt = await updateArtById(artId, result.data.name);

  return NextResponse.json({ art: newArt });
}
