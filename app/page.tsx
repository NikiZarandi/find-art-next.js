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
        <div className={styles.fotobutton}>
          <div>
            <Image
              className={styles.image}
              src="/images/firstpage/painting.jpg"
              alt="painting"
              width="200"
              height="500"
            />
            <div>
              <button type="button" className={styles.button}>
                PAINTING
              </button>
            </div>
          </div>
        </div>
        <div>
          <Image
            className={styles.image}
            src="/images/firstpage/angosht.jpg"
            alt="angosht"
            width="200"
            height="300"
          />
          <div>
            <button type="button" className={styles.button}>
              GRAPHIC DESIGN
            </button>
          </div>
        </div>
        <div>
          <Image
            className={styles.image}
            src="/images/firstpage/chair.jpg"
            alt="chair"
            width="200"
            height="300"
          />

          <div>
            <button type="button" className={styles.button}>
              INDUSTRIAL DESIGN
            </button>
          </div>
        </div>

        <div>
          <Image
            className={styles.image}
            src="/images/firstpage/jewlery.jpg"
            alt="jewlery"
            width="200"
            height="300"
          />
          <div>
            <button type="button" className={styles.button}>
              JEWELLERY
            </button>
          </div>
        </div>
      </div>

      <p className={styles.p}> lalalala </p>
      <div className={styles.divElementOne}>
        We live by the motto: “Our customers are the focus”. Your wishes and
        concerns are important to us. We want to inspire you with our design
        ideas. We live by the motto: “Our customers are the focus”. Your wishes
        and concerns are important to us. We want to inspire you with our design
        ideas.We live by the motto: “Our customers are the focus”. Your wishes
        and concerns are important to us. We want to inspire you with our design
        ideas.
      </div>
      <br />

      <br />
      <br />
      <br />
      <br />
      <br />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={styles.divElementzeri}>
        <div>
          <div className={styles.divElementzeri}>
            gallery painting ideas illustration connection inspiration graphic
            art in context
          </div>
        </div>

        <div>
          <Image
            className={styles.image3}
            src="/images/firstpage/badbadak.jpeg"
            alt="galery"
            width="600"
            height="700"
          />
        </div>
        <div className={styles.texti}>
          mak gallery london art gallery exhibitions museum of modern Art
        </div>
      </div>
    </main>
  );
}
