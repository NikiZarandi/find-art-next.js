import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { Art, getArtsByUserId } from '../../../database/arts';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../database/users';
import RemoveArt from '../RemoveArt';
import AddArt from './AddArt';
import styles from './profilepage.module.scss';

type Props = {
  params: { username: string };
  art: Art;
};

export default async function UserProfile({ params }: Props) {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const currentUser = token && (await getUserBySessionToken(token.value));

  if (!currentUser) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/arts`)
    );
  }

  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  // const favorites = await getFavoriteByImageId(user.id);
  const arts = await getArtsByUserId(user.id);

  return (
    <main>
      <div className={styles.Profilepage}>
        <h1 className={styles.username}>
          <b>Hallo {user.username}</b>
        </h1>
        {/* <p>id: {user.id}</p> */}
        <Link href={`/profile/${user.username}/userfavorites`}>
          <b className={styles.myFavorites}>MY FAVORITES</b>
        </Link>
        {currentUser.id === user.id ? (
          // <AddImage user={user} images={images} />
          <AddArt userId={user.id} arts={arts} />
        ) : (
          ''
        )}
        <span className={styles.image}>
          {arts.map((art) => {
            return (
              <div key={`user-${art.userId}`}>
                <div>
                  <Image
                    src={`${art.imageUrl}`}
                    alt="user generated image"
                    width="100"
                    height="160"
                  />
                </div>
                <div>
                  <p>{art.description}</p>
                </div>
                <div className={styles.removebutton}>
                  <RemoveArt art={art} />
                </div>
              </div>
            );
          })}
        </span>
      </div>
    </main>
  );
}
