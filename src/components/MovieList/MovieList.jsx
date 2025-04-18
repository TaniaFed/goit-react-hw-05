import css from './MovieList.module.css'
import { Link, useLocation } from 'react-router-dom'

export default function MovieList({ movies }) {
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

  const location = useLocation()
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <div key={movie.id} className={css.listBox}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={css.movieName}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              alt="movie.title"
              width={200}
              height={250}
            />
            <li className={css.listItem}>
              {movie.title}{' '}
              {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}
            </li>
          </Link>
        </div>
      ))}
    </ul>
  )
}
