import { getPaintings } from '@/database/paintings';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Paintings',
  description: 'This is my Paintings page',
};

export default async function PaintingsPage() {
  const paintings = await getPaintings();
  return (
    <div>
      {/* <h1 className={styles.h1}>Products</h1> */}

      <main>
        {paintings.map((painting) => {
          // console.log(paintings);
          return (
            <div key={`paintings-${painting.id}`}>
              <Link href={`/paintings/${painting.id}`}>{painting.name}</Link>

              <h2>{painting.description}</h2>

              <div>
                <h2>{painting.categoriesId}</h2>
                <Image
                  src={painting.imageUrl}
                  alt={painting.name}
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
