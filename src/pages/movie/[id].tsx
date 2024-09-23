import fetchSingleMovie from '@/lib/fetch-single-movie';
import style from './[id].module.css';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import fetchAllMovies from '@/lib/fetch-all-movies';
import { MovieData } from '@/types';
import Head from 'next/head';

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await fetchAllMovies();
  const paths = movies.map((movie: MovieData) => ({
    params: { id: movie.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  try {
    const movie = await fetchSingleMovie(Number(id));

    if (!movie) {
      return { notFound: true };
    }

    return {
      props: { movie },
      revalidate: 60, // 60초마다 재생성
    };
  } catch (error) {
    console.error('Error fetching movie:', error);
    return { notFound: true };
  }
};

export default function Page({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
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
        <div>로딩중입니다...</div>
      </>
    );
  }

  if (!movie) {
    return <div>Not found</div>;
  }

  return (
    <>
      <Head>
        <title>{movie.title}</title>
        <meta
          property='og:image'
          content={movie.posterImgUrl}
        />
        <meta
          property='og:title'
          content={movie.title}
        />
        <meta
          property='og:description'
          content={movie.description}
        />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{
            backgroundImage: `url('${movie.posterImgUrl}')`,
          }}
        >
          <img src={movie.posterImgUrl} />
        </div>
        <div className={style.title}>{movie.title}</div>

        <div className={style.release_data}>
          {movie.releaseDate} / {movie.genres.join(', ')} / {movie.runtime}분
        </div>
        <div className={style.company}>{movie.company}</div>
        <div className={style.subTitle}>{movie.subTitle}</div>
        <div className={style.description}>{movie.description}</div>
      </div>
    </>
  );
}
