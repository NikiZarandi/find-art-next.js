import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
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
        <h1 className={styles.text}>FIND ART</h1>
      </div>
      <div>
        <div className={styles.fis}>
          Arts & designs community through young artists & designers
        </div>
      </div>
      {/* <div className={styles.flex1}> */}
      <div className={styles.blick}>
        <div>
          <div>
            <Link href={`/paintings`}>
              <Image
                className={styles.backgroundimage}
                src="/images/firstpage/painting.jpg"
                alt="painting"
                width="200"
                height="300"
              />
              <div className={styles.painting}>PAINTING</div>
            </Link>
          </div>
        </div>
        <div>
          <Link href={`/graphicdesigns`}>
            <Image
              className={styles.backgroundimage}
              src="/images/firstpage/angosht.jpg"
              alt="angosht"
              width="200"
              height="300"
            />
            <div className={styles.graphicdesign}>Graphic Design</div>
          </Link>
        </div>
        <div>
          <Link href={`/industrialdesigns`}>
            <Image
              className={styles.backgroundimage}
              src="/images/firstpage/chair.jpg"
              alt="chair"
              width="200"
              height="300"
            />
            <div className={styles.industrialdesign}>Industrial Design</div>
          </Link>
        </div>

        <div>
          <Link href={`/jewelries`}>
            <Image
              className={styles.backgroundimage}
              src="/images/firstpage/jewlery.jpg"
              alt="jewlery"
              width="200"
              height="300"
            />
            <div className={styles.jewelry}>Jewelry</div>
          </Link>
        </div>
      </div>
      {/* </div> */}
      {/* <p className={styles.texttitle}> ... </p> */}
      <div className={styles.divElementOne}>
        <div>
          findart is a platform for creators and people interested in the field
          of visual arts and artworks. This includes paintings, graphic design,
          industrial design and jewellery. The goal is to support unique and
          outstanding young artists as early as possible and to strengthen their
          autonomy so that they can build up their existence as independently as
          possible from galleries. How it works for artists - the profile is
          filled out and at least one piece of art must be uploaded and
          described in the portfolio. The photos of the artworks must be of high
          quality. The quality of the uploaded artworks is constantly being
          examined in order to maintain the quality standard. How it works for
          visitors interested in art – just visit findart and enjoy or create a
          login and interact with our artists.
        </div>
      </div>

      <div className={styles.divElementzeri}>
        <div>
          <Image
            className={styles.divElementOne}
            src="/images/firstpage/dast.jpeg"
            alt="galery"
            width="600"
            height="700"
          />
        </div>
      </div>
      {/* <div className={styles.connectUs}>
        For mor Information you can contact us hier!
      </div> */}
    </main>
  );
}
