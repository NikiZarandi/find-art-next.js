import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getPaintings } from '../../database/paintings';
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
              <div className={styles.abstand}>
                <Image
                  className={styles.image}
                  src={painting.imageUrl}
                  alt={painting.name}
                  height={360}
                  width={250}
                />
              </div>
              <div>
                <h2 className={styles.name}>{painting.description}</h2>
              </div>
              <div>
                <div>
                  <Link
                    className={styles.description}
                    href={`/paintings/${painting.id}`}
                  >
                    {painting.name}
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
