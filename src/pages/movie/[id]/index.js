import React from 'react';
import { useRouter } from 'next/router';

const Movie = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{id} 영화 상세페이지</h1>
    </div>
  );
};

export default Movie;
