import Image from 'next/image';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Find Art',
  description: 'Discover a world of art and design!',
  icons: {
    shortcut: '/icon.svg',
  },
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.text}>Find Art</h1>
      </div>
      <div>
        <div className={styles.fis}>
          Arts & designs community through young artists & designers
        </div>

        {/* <div className={styles.butt}>
          <button type="button">Login</button>
        </div> */}
        {/* <a  href="/register">
          {' '}
          Register now
        </a> */}
      </div>
      <div className={styles.blick}>
        <div>
          <Image
            className={styles.image}
            src="/images/firstpage/painting.jpg"
            alt="painting"
            width="200"
            height="500"
          />
        </div>
        <div>
          <Image
            className={styles.image}
            src="/images/firstpage/angosht.jpg"
            alt="angosht"
            width="200"
            height="300"
          />
        </div>
        <div>
          <Image
            className={styles.image}
            src="/images/firstpage/chair.jpg"
            alt="chair"
            width="200"
            height="300"
          />
        </div>
        <div>
          <Image
            className={styles.image}
            src="/images/firstpage/jewlery.jpg"
            alt="jewlery"
            width="200"
            height="300"
          />
        </div>
      </div>

      <div className={styles.divElementOne}>
        We live by the motto: “Our customers are the focus”. Your wishes and
        concerns are important to us. We want to inspire you with our design
        ideas.
      </div>
      <div>
        <Image
          className={styles.ita}
          src="/images/firstpage/tir.jpeg"
          alt="tir"
          width="200"
          height="300"
        />
      </div>
    </main>
  );
}
