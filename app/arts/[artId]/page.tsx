import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArtById } from '../../../database/arts';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

type Props = {
  art: any;
  params: {
    artId: string;
    name: string;
    description: string;
    imageUrl: string;
    categoryId: number;
  };
};

export default async function ArtPage(props: Props) {
  const singleArt = await getArtById(parseInt(props.params.artId));
  if (!singleArt) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return (
    <main className={styles.container}>
      <div className={styles.main}>
        {/* This is a {singleProduct.type} */}
        <div className={styles.border}>
          <h1 className={styles.descriptionText}>{singleArt.description}</h1>
          <h1 className={styles.artistName}>Artist name: {singleArt.name}</h1>

          <h1 className={styles.emailText}>
            email adress: Niyan.Torlos@gmail.com
          </h1>
        </div>
        <br />
        <Image
          className={styles.image}
          src={singleArt.imageUrl}
          alt={singleArt.name}
          height={360}
          width={250}
        />
      </div>
    </main>
  );
}
