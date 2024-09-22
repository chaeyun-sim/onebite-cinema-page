import Head from 'next/head';
import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import style from './index.module.css';
import Link from 'next/link';
import fetchAllMovies from '@/lib/fetch-all-movies';
import { InferGetServerSidePropsType } from 'next';
import fetchRandomMovies from '@/lib/fetch-reco-movies';

export const getServerSideProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([fetchAllMovies(), fetchRandomMovies()]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>ONEBITE CINEMA</title>
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={`${style.movie_container} ${style.three_sections}`}>
            {recoMovies?.slice(0, 3).map((item: { id: string }) => (
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
            {allMovies?.map(item => (
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
