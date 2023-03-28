import { getGraphicdesigns } from '@/database/graphicdesigns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './page.module.scss';

export const metadata = {
  title: 'Graphicdesigns',
  description: 'This is my Graphicdesigns page',
};

export default async function GraphicdesignsPage() {
  const arts = await getGraphicdesigns();
  return (
    <div>
      {/* <h1 className={styles.h1}>Graphicdesigns</h1> */}

      <main className={styles.images}>
        {arts.map((graphicdesign) => {
          // console.log(graphicdesigns);
          return (
            <div key={`graphicdesigns-${graphicdesign.id}`}>
              <Link href={`/graphicdesigns/${graphicdesign.id}`}>
                {graphicdesign.name}
              </Link>

              <h2>{graphicdesign.description}</h2>

              <div>
                <h2>{graphicdesign.categoriesId}</h2>
                <Image
                  src={graphicdesign.imageUrl}
                  alt={graphicdesign.name}
                  height={200}
                  width={200}
                />
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
