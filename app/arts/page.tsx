import { getArts } from '@/database/arts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Arts',
  description: 'This is my Products page',
};

export default async function ArtsPage() {
  const arts = await getArts();
  return (
    <div>
      {/* <h1 className={styles.h1}>Products</h1> */}

      <main>
        {arts.map((art) => {
          console.log(arts);
          return (
            <div key={`arts-${art.id}`}>
              <Link href={`/arts/${art.id}`}>{art.name}</Link>

              <h2>{art.description}</h2>
              <h2>{art.categoriesId}</h2>
              <Image
                src={art.imageUrl}
                alt={art.name}
                height={200}
                width={200}
              />
            </div>
          );
        })}
      </main>
    </div>
  );
}
