import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getIndustrialdesigns } from '../../database/industrialdesigns';
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
              <div className={styles.abstand}>
                <Image
                  className={styles.image}
                  src={industrialdesign.imageUrl}
                  alt={industrialdesign.name}
                  height={360}
                  width={250}
                />
              </div>
              <div>
                <h2 className={styles.name}>{industrialdesign.description}</h2>
              </div>
              <div className={styles.description}>
                <div>
                  <Link href={`/industrialdesigns/${industrialdesign.id}`}>
                    {industrialdesign.name}
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
