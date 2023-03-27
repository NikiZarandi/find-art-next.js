import { getPaintingById } from '@/database/paintings';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Props = {
  painting: any;
  params: {
    paintingId: string;
    name: string;
    description: string;
    categoryId: number;
  };
};

export default async function PaintingPage(props: Props) {
  console.log('lets see the type', props.params.paintingId);
  const singlePainting = await getPaintingById(
    parseInt(props.params.paintingId),
  );
  // console.log('seeeeee', singleArt);

  if (!singlePainting) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return (
    <main>
      {/* This is a {singleProduct.type} */}
      <h1>{singlePainting.name}</h1>
      {/* <h1>{singlePainting.description}</h1>
      <h1>{singlePainting.categoriesId}</h1> */}
      <br />
      <br />
      <br />
      {/* <Image
        // className={styles.imageProducts}
        src={`/images/${singlePainting.name}-${singlePainting.id}.jpeg`}
        // alt={singlePainting.description}
        width="300"
        height="300"
      /> */}
    </main>
  );
}
