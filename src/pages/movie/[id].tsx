import fetchSingleMovie from '@/lib/fetch-single-movie';
import style from './[id].module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;
  const movie = await fetchSingleMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie: JSON.parse(JSON.stringify(movie)),
    },
  };
};

export default function Page({ movie }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movie) {
    return <div>Not found</div>;
  }

  return (
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
  );
}
