import Image from 'next/image';
import Link from 'next/link';
import { getArts } from '../../../database/arts';

export const dynamic = 'force-dynamic';

export const metadata = {
  description: 'Get all arts',
};

export default async function ArtsPage() {
  const arts = await getArts();

  return (
    <>
      <h1>Arts</h1>
      <main>
        {arts.map((art) => {
          return (
            <div key={`art-${art.id}`}>
              <Link href={`/art-management-naive-dont-copy/read/${art.id}`}>
                <h2>{art.name}</h2>
              </Link>
              <Link href={`/art-management-naive-dont-copy/read/${art.id}`}>
                <Image
                  src={`/images/${art.name}-${art.id}.jpg`}
                  width="200"
                  height="200"
                />
              </Link>
            </div>
          );
        })}
      </main>
    </>
  );
}
