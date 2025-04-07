import { useEffect, useState } from 'react'
import css from './HomePage.module.css'
import { ThreeDot } from 'react-loading-indicators'
import toast, { Toaster } from 'react-hot-toast'
import { fetchTrendingMovies } from '../../userService'
import MovieList from '../../components/MovieList/MovieList'

export default function HomePage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error) {
      toast('Oops! Something went wrong...')
    }
  }, [error])

  useEffect(() => {
    async function getMovies() {
      setIsLoading(true)
      try {
        const data = await fetchTrendingMovies()
        setMovies(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    getMovies()
  }, [])

  return (
    <div className={css.box}>
      <h1>Trending today</h1>
      <Toaster position="top-left" />
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
      <MovieList movies={movies} />
    </div>
  )
}
