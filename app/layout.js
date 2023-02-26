import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav>
            <Link href={'/'}>Home</Link>
            <Link href={'/arts'}>Arts</Link>
          </nav>
        </header>
        {children}
        <footer>copyright Arts</footer>
      </body>
    </html>
  );
}
