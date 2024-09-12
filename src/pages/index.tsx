import Head from 'next/head';
import localFont from 'next/font/local';
import SearchableLayout from './components/searchable-layout';
import { ReactNode } from 'react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function Home() {
  return (
    <>
      <Head>
        <title>ONEBITE BOOKS</title>
      </Head>
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <main></main>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
