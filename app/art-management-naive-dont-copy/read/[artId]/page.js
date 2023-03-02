import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArtById } from '../../../../database/arts';
import { rootNotFoundMetadata } from '../../../not-found';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const singleArt = await getArtById(props.params.artId);

  if (!singleArt) {
    return rootNotFoundMetadata;
  }

  return {
    title: singleArt.firstName,
    description: `Single art page for ${singleArt.firstName}`,
  };
}

export default async function ArtPage(props) {
  const singleArt = await getArtById(props.params.artId);

  if (!singleArt) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return (
    <>
      <h1>{singleArt.name}</h1>
      <main>
        This art is a {singleArt.type}
        <br />
        <Image
          src={`/images/${singleArt.name}-${singleArt.id}.jpg`}
          alt={singleArt.type}
          width="200"
          height="200"
        />
      </main>
    </>
  );
}
