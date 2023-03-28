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
              <Link href={`/jewelries/${jewelry.id}`}>{jewelry.name}</Link>

              <h2>{jewelry.description}</h2>

              <div>
                <h2>{jewelry.categoriesId}</h2>
                <Image
                  src={jewelry.imageUrl}
                  alt={jewelry.name}
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
