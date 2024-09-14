/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import movies from '@/mock/dummy.json';
import { MovieData } from '@/types';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const { q } = router.query;

  const [filteredMovies, setFilteredMovies] = useState<MovieData[]>([]);

  useEffect(() => {
    setFilteredMovies(movies.filter(el => el.title.startsWith(String(q))));
  }, [q]);

  return (
    <div>
      <h1>Search {q}</h1>
      {filteredMovies.map(item => (
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
