import { getArtById } from '@/database/arts';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Props = {
  art: any;
  params: {
    artId: string;
    name: string;
    description: string;
    categoryId: string;
  };
};

export default async function ArtPage(props: Props) {
  console.log('lets see the type', props.params.artId);
  const singleArt = await getArtById(parseInt(props.params.artId));
  // console.log('seeeeee', singleArt);

  if (!singleArt) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return (
    <main>
      {/* This is a {singleProduct.type} */}
      <h1>{singleArt.name}</h1>
      <h1>{singleArt.description}</h1>
      <h1>{singleArt.categoryId}</h1>
      <br />
      <br />
      <br />
      <Image
        // className={styles.imageProducts}
        src={`/images/${singleArt.name}-${singleArt.id}.jpeg`}
        alt={singleArt.description}
        width="300"
        height="300"
      />
    </main>
  );
}
