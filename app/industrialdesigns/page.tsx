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
              <div>
                <Image
                  className={styles.image}
                  src={industrialdesign.imageUrl}
                  alt={industrialdesign.name}
                  height={360}
                  width={250}
                />
              </div>
              <div>
                <div>
                  <Link
                    className={styles.name}
                    href={`/industrialdesigns/${industrialdesign.id}`}
                  >
                    {industrialdesign.name}
                  </Link>
                </div>
                <div>
                  <h2 className={styles.description}>
                    {industrialdesign.description}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
