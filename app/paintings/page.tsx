import { getPaintings } from '@/database/paintings';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './page.module.scss';

export const metadata = {
  title: 'Paintings',
  description: 'This is my Paintings page',
};

export default async function PaintingsPage() {
  const paintings = await getPaintings();
  return (
    <div>
      {/* <h1 className={styles.h1}>Products</h1> */}

      <main className={styles.images}>
        {paintings.map((painting) => {
          // console.log(paintings);
          return (
            <div key={`paintings-${painting.id}`}>
              <div>
                <Image
                  className={styles.image}
                  src={painting.imageUrl}
                  alt={painting.name}
                  height={360}
                  width={250}
                />
              </div>
              <div>
                <div>
                  <Link href={`/paintings/${painting.id}`}>
                    {painting.name}
                  </Link>
                </div>
                <div>
                  <h2 className={styles.description}>{painting.description}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
