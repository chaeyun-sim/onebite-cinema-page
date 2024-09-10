import { useRouter } from 'next/router';
import React from 'react';

const Search = () => {
  const router = useRouter();
  const { q } = router.query;
  return (
    <div>
      <h1>검색 결과: {q}</h1>
    </div>
  );
};

export default Search;
