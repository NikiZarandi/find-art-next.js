// /* eslint-disable react/no-unknown-property */
// import { notFound } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import Header from '../../component/Header';

// // eslint-disable-next-line require-await
// export async function generateMetadata({ params }) {
//   // eslint-disable-next-line no-undef
//   const singleArt = arts.find((arts) => {
//     return arts.name.toLowerCase() === params.artName;
//   });

//   if (!singleArt) {
//     // eslint-disable-next-line no-undef
//     return rootNotFoundMetadata;
//   }

//   return {
//     title: singleArt.name,
//     description: `Single art page for ${singleArt.name}`,
//   };
// }

// // we add this only if we have no dynamic function as cookies or headers
// export const dynamic = 'force-dynamic';

// export default function ArtPage({ params }) {
//   // eslint-disable-next-line no-undef
//   const singleArt = arts.find((art) => {
//     return art.name.toLowerCase() === params.artName;
//   });

//   if (!singleArt) {
//     notFound();
//   }

//   return <arts art={singleArt} />;
// }
