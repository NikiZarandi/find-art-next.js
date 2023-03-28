import { getJewelryById } from '@/database/ jewelries';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Props = {
  jewelry: any;
  params: {
    jewelryId: string;
    name: string;
    description: string;
    categoryId: number;
  };
};

export default async function JewelryPage(props: Props) {
  console.log('lets see the type', props.params.jewelryId);
  const singleJewelry = await getJewelryById(parseInt(props.params.jewelryId));
  // console.log('seeeeee', singleArt);

  if (!singleJewelry) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return (
    <main>
      {/* This is a {singleProduct.type} */}
      <h1>{singleJewelry.name}</h1>
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
