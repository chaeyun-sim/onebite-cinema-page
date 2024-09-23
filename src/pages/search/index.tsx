/* eslint-disable @next/next/no-typos */
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import Link from 'next/link';
import fetchAllMovies from '@/lib/fetch-all-movies';
import { MovieData } from '@/types';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Page() {
  const router = useRouter();
  const { q } = router.query;
  const [movies, setMovies] = useState<MovieData[]>([]);

  const fetchSearchResult = async () => {
    const data = await fetchAllMovies(q as string);
    setMovies(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입시네마 - 검색결과</title>
        <meta
          property='og:image'
          content='/thumbnail.png'
        />
        <meta
          property='og:title'
          content='한입시네마 - 검색결과'
        />
        <meta
          property='og:description'
          content='한입 시네마에 등록된 영화들을 만나보세요!'
        />
      </Head>
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
