import { getGraphicdesignById } from '@/database/graphicdesigns';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Props = {
  Graphicdesign: any;
  params: {
    GraphicdesignId: string;
    name: string;
    description: string;
    categoryId: number;
  };
};

export default async function GraphicdesignPage(props: Props) {
  console.log('lets see the type', props.params.GraphicdesignId);
  const singleGraphicdesign = await getGraphicdesignById(
    parseInt(props.params.GraphicdesignId),
  );
  // console.log('seeeeee', singleGraphicdesign);

  if (!singleGraphicdesign) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return (
    <main>
      {/* This is a {singleProduct.type} */}
      <h1>{singleGraphicdesign.name}</h1>
      {/* <h1>{singleGraphicdesign.description}</h1>
      <h1>{singleGraphicdesign.categoriesId}</h1> */}
      <br />
      <br />
      <br />
      {/* <Image
        // className={styles.imageProducts}
        src={`/images/${singleGraphicdesign.name}-${singleGraphicdesign.id}.jpeg`}
        // alt={singleGraphicdesign.description}
        width="300"
        height="300"
      /> */}
    </main>
  );
}
