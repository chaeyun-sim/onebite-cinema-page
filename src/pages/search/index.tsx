/* eslint-disable @next/next/no-typos */
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import Link from 'next/link';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchAllMovies from '@/lib/fetch-all-movies';
import { MovieData } from '@/types';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q;
  const movies = await fetchAllMovies(q as string);

  return {
    props: {
      movies,
    },
  };
};

export default function Page({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {movies.map((item: MovieData) => (
        <Link
          key={item.id}
          href={`/movie/${item.id}`}
        >
          <img src={item.posterImgUrl} />
        </Link>
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
