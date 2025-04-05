import css from './MovieList.module.css'
import { Link } from 'react-router-dom'

export default function MovieList({ movies }) {
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.listItem}>
          <Link to={`/movies/${movie.id}`} className={css.movieName}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
