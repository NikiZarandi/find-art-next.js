// import Link from 'next/link';

// export const metadata = {
//   title: 'Thank You',
//   description: 'Thank you for order ',
//   icons: {
//     shortcut: '/icon.svg',
//   },
// };
// export default function ThankyouPage() {
//   return (
//     <main>
//       <div>
//         <h1> Thank you!</h1>
//         <p>Your order was placed successfully.</p>
//         <span>
//           <Link href="/"> Back to home [↙]</Link>
//         </span>
//       </div>
//     </main>
//   );
// }

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './page.module.scss';

export const metadata = {
  title: 'painting',
  description: 'This is my Painting page',
};

export default async function ArtsPage() {
  const painting = await getPainting();
  return (
    <div>
      {/* <h1 className={styles.h1}>Products</h1> */}

      <main className={styles.images}>
        {arts.map((art) => {
          console.log(arts);
          return (
            <div key={`arts-${art.id}`}>
              <Link href={`/arts/${art.id}`}>{art.name}</Link>

              <h2>{art.description}</h2>

              <div>
                <h2>{art.categoriesId}</h2>
                <Image
                  src={art.imageUrl}
                  alt={art.name}
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
