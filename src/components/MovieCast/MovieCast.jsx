import css from './MovieCast.module.css'
import { fetchCast } from '../../userService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const defaultActorImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'

export default function MovieCast() {
  const { movieId } = useParams()
  const [casts, setCasts] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getCasts() {
      setIsLoading(true)
      try {
        const data = await fetchCast(movieId)
        setCasts(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    getCasts()
  }, [movieId])

  if (!casts) {
    return <p>Loading cast details...</p>
  }

  return (
    <div className={css.container}>
      {isLoading && <b>Loading...</b>}
      {error && <b>Oops! Something went wrong...</b>}
      <h2 className={css.text}>Movie cast</h2>
      <div className={css.list}>
        {casts.map((cast) => (
          <div
            key={cast.cast_id}
            className={cast.completed ? css.completed : css.pending}
          >
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${cast.profile_path}`
                  : defaultActorImg
              }
              alt={cast.name}
              width={250}
              className={css.img}
            />
            <div className={css.nameText}>
              <b>{cast.name}</b>
              <b className={css.character}>Character: </b>
              <b>{cast.character}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
