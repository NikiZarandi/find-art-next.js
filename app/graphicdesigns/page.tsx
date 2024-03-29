import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getGraphicdesigns } from '../../database/graphicdesigns';
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
              <div className={styles.abstand}>
                <Image
                  className={styles.image}
                  src={graphicdesign.imageUrl}
                  alt={graphicdesign.name}
                  height={360}
                  width={250}
                />
              </div>
              <div>
                <h2 className={styles.name}>{graphicdesign.description}</h2>
              </div>
              <div>
                <div className={styles.description}>
                  <Link href={`/graphicdesigns/${graphicdesign.id}`}>
                    {graphicdesign.name}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
