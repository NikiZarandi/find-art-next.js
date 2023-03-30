import { getJewelries } from '@/database/ jewelries';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './page.module.scss';

export const metadata = {
  title: 'Jewelries',
  description: 'This is my Jewelries page',
};

export default async function JewelriesPage() {
  const paintings = await getJewelries();
  return (
    <div>
      {/* <h1 className={styles.h1}>Products</h1> */}

      <main className={styles.images}>
        {paintings.map((jewelry) => {
          // console.log(jewelries);
          return (
            <div key={`jewelries-${jewelry.id}`}>
              <div>
                {/* <h2>{jewelry.categoriesId}</h2> */}
                <Image
                  className={styles.image}
                  src={jewelry.imageUrl}
                  alt={jewelry.name}
                  height={360}
                  width={250}
                />
              </div>
              <div>
                <div>
                  <Link
                    className={styles.name}
                    href={`/jewelries/${jewelry.id}`}
                  >
                    {jewelry.name}
                  </Link>
                </div>
                <div>
                  <h2 className={styles.description}>{jewelry.description}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
