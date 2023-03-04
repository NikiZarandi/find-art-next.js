import { getArts } from '@/database/arts';
import Link from 'next/link';

export const metadata = {
  title: 'Arts',
  description: 'This is my Products page',
};

export default async function ProductsPage() {
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
              <h2>{art.categoryId}</h2>
            </div>
          );
        })}
      </main>
    </div>
  );
}
