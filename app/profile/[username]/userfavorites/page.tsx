import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFavoriteByIdWithImageInfo } from '../../../../database/favorites';
import { getUserByUsername } from '../../../../database/users';
import RemoveFavorite from './RemoveFavorites';

type Props = {
  params: { username: string; userId: number };
};

export default async function UserFavoritse({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const favorites = await getFavoriteByIdWithImageInfo(user.id);

  return (
    <main>
      <h1>
        <b>MY FAVORITES:</b>
      </h1>

      <span>
        {favorites.map((favorite) => {
          return (
            <div key={`image-${favorite.imageId}`}>
              <Link href={`/images/${favorite.imageId}`}>
                <figure>
                  <Image
                    src={`/images/${favorite.imageId}.jpg`}
                    alt="arts image"
                    width="200"
                    height="200"
                  />
                </figure>
              </Link>
              <div>
                <RemoveFavorite favorite={favorite} />
              </div>
            </div>
          );
        })}
      </span>
    </main>
  );
}
