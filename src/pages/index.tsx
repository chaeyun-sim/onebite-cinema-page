import Head from 'next/head';
import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import style from './index.module.css';
import Link from 'next/link';
import fetchAllMovies from '@/lib/fetch-all-movies';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MovieData } from '@/types';
import fetchRandomMovies from '@/lib/fetch-reco-movies';

export const getStaticProps: GetStaticProps = async () => {
  const [allMovies, randomMovies] = await Promise.all([fetchAllMovies(), fetchRandomMovies()]);

  return {
    props: { allMovies, randomMovies },
  };
};

export default function Home({
  allMovies,
  randomMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입시네마</title>
        <meta
          property='og:image'
          content='/thumbnail.png'
        />
        <meta
          property='og:title'
          content='한입시네마'
        />
        <meta
          property='og:description'
          content='한입 시네마에 등록된 영화들을 만나보세요!'
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={`${style.movie_container} ${style.three_sections}`}>
            {randomMovies?.map((item: MovieData) => (
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
            {allMovies?.map((item: MovieData) => (
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
