import { getIndustrialdesigns } from '@/database/industrialdesigns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './page.module.scss';

// import styles from './page.module.scss';

export const metadata = {
  title: 'Industrialdesign',
  description: 'This is my Industrialdesigns page',
};

export default async function IndustrialdesignPage() {
  const industrialdesigns = await getIndustrialdesigns();
  return (
    <div>
      {/* <h1 className={styles.h1}>Arts</h1> */}

      <main className={styles.images}>
        {industrialdesigns.map((industrialdesign) => {
          // console.log(industrialdesigns);
          return (
            <div key={`industrialdesigns-${industrialdesign.id}`}>
              <Link href={`/industrialdesigns/${industrialdesign.id}`}>
                {industrialdesign.name}
              </Link>

              <h2>{industrialdesign.description}</h2>

              <div>
                <h2>{industrialdesign.categoriesId}</h2>
                <Image
                  src={industrialdesign.imageUrl}
                  alt={industrialdesign.name}
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
