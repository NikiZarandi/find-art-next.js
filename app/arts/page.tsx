import { getArts } from '@/database/arts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './page.module.scss';

export const metadata = {
  title: 'Arts',
  description: 'This is my Arts page',
};

export default async function ArtsPage() {
  const arts = await getArts();
  return (
    <div>
      {/* <h1 className={styles.h1}>Arts</h1> */}

      <main className={styles.images}>
        {arts.map((art) => {
          console.log(arts);
          return (
            <div key={`arts-${art.id}`}>
              <div>
                {/* <h2>{art.categoriesId}</h2> */}
                <Image
                  className={styles.image}
                  src={art.imageUrl}
                  alt={art.name}
                  height={360}
                  width={240}
                />
              </div>
              <Link href={`/arts/${art.id}`}>{art.name}</Link>

              <h2 className={styles.description}>{art.description}</h2>
            </div>
          );
        })}
      </main>
    </div>
  );
}
