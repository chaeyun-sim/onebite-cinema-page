import Head from 'next/head';
import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import style from './index.module.css';
import movies from '@/mock/dummy.json';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>ONEBITE BOOKS</title>
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={`${style.movie_container} ${style.three_sections}`}>
            {movies.slice(0, 3).map(item => (
              <Link
                key={item.id}
                href={`/movie/${item.id}`}
              >
                <img src={item.posterImgUrl} />
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h3>등록된 모든 영화</h3>
          <div className={`${style.movie_container} ${style.five_sections}`}>
            {movies.map(item => (
              <Link
                key={item.id}
                href={`/movie/${item.id}`}
              >
                <img src={item.posterImgUrl} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
