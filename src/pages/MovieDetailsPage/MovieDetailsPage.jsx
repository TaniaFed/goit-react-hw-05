import { useEffect, useState, useRef } from 'react'
import { Link, useParams, NavLink, Outlet, useLocation } from 'react-router-dom'
import css from './MovieDetailsPage.module.css'
import { MdOutlineArrowCircleLeft } from 'react-icons/md'
import { FcRating } from 'react-icons/fc'
import { ThreeDot } from 'react-loading-indicators'
import { fetchMovieById } from '../../userService'

export default function MovieDetailsPage() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const location = useLocation()

  const handleGoBack = useRef(location.state ?? '/movies')

  useEffect(() => {
    async function getMovie() {
      setIsLoading(true)
      try {
        const data = await fetchMovieById(movieId)
        setMovie(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    getMovie()
  }, [movieId])

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

  if (!movie) {
    return <p>Loading movie details...</p>
  }

  return (
    <div className={css.container}>
      <Link to={handleGoBack.current}>
        <button className={css.backBtn} type="button">
          <div className={css.btn}>
            <MdOutlineArrowCircleLeft />
            Back
          </div>
        </button>
      </Link>
      {isLoading && (
        <ThreeDot
          variant="bounce"
          color="#14d5e5"
          size="medium"
          text="Loading"
          textColor=""
        />
      )}
      {error && <b>Oops! Something went wrong...</b>}
      <div className={css.box}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt="movie.title"
        />
        <ul className={css.movieList}>
          <li className={css.movieListItem}>
            <h2>
              {movie.title}{' '}
              {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}
            </h2>

            <h3>
              User score:{' '}
              {movie.vote_average ? movie.vote_average.toFixed(1) : '0'} out of
              10 <FcRating />
            </h3>

            <h3>Overview</h3>
            <p>{movie.overview}</p>

            <h3>Genres</h3>
            <p>
              {' '}
              {movie.genres && movie.genres.length > 0
                ? movie.genres.map((genre) => genre.name).join(', ')
                : 'Genres not available'}
            </p>
          </li>
        </ul>
      </div>
      <div className={css.addList}>
        <h2>Additional information</h2>
        <ul className={css.list}>
          <li className={css.listItem}>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li className={css.listItem}>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}
