import './global.scss';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import CookieBanner from './CookieBanner';
import styles from './layout.module.scss';

export const metadata = {
  title: {
    default: 'arts4everyone',
    template: '%s | animals4everyone',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function RootLayout(props: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  // if user is not undefined, the person is logged in
  // if user is undefined, the person is logged out

  const randomNumber = Math.floor(Math.random() * 10);

  return (
    <html lang="en">
      <head />
      <body className={styles.body}>
        <CookieBanner />
        <header className={styles.header}>
          <img
            className={styles.logoz}
            src="images/firstpage/logo.svg "
            alt="logo "
          />

          <nav>
            <div className={styles.auth}>
              <a href="/">Home</a>
              <a href="/arts">Arts</a>
              {/* <div>{randomNumber}</div> */}
              {/* <a href="/categorys">Categories</a> */}

              {/* <Link href="/arts/paginated">paginated</Link> */}
              <div>
                {user && user.username}
                {user ? (
                  <Link href="/logout" prefetch={false}>
                    logout
                  </Link>
                ) : (
                  <>
                    <Link href="/register">register</Link>
                    <Link href="/login">login</Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </header>

        {props.children}
        <footer className={styles.footer}>
          <div className={styles.textii}>
            <p>FIND ART</p>
            <p>Email: findart@artanddesign.com</p>
            <p>CONTACT</p>

            <img src="images/icons/icons8-instagram-48.svg " alt="instagram " />
            <div>
              <img
                className={styles.facebookIcon}
                src="images/icons/facebook-line-icon.svg "
                alt="facebook"
              />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
