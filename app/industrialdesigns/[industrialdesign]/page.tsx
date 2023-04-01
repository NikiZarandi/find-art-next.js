import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getIndustrialdesignById } from '../../../database/industrialdesigns';

export const dynamic = 'force-dynamic';

type Props = {
  industrialdesign: any;
  params: {
    industrialdesignId: string;
    name: string;
    description: string;
    categoryId: number;
  };
};

export default async function IndustrialdesignPage(props: Props) {
  console.log('lets see the type', props.params.industrialdesignId);
  const singleIndustrialdesign = await getIndustrialdesignById(
    parseInt(props.params.industrialdesignId),
  );
  // console.log('seeeeee', singleArt);

  if (!singleIndustrialdesign) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return (
    <main>
      {/* This is a {singleProduct.type} */}
      <h1>{singleIndustrialdesign.name}</h1>
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
