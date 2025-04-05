import css from './MovieReviews.module.css'
import { fetchReviews } from '../../userService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieReviews() {
  const { movieId } = useParams()
  const [reviews, setReviews] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getReviews() {
      setIsLoading(true)
      try {
        const data = await fetchReviews(movieId)
        setReviews(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    getReviews()
  }, [movieId])

  if (!reviews) {
    return <p>Loading reviews...</p>
  }

  return (
    <div className={css.container}>
      {isLoading && <b>Loading...</b>}
      {error && <b>Oops! Something went wrong...</b>}
      <h2 className={css.title}>Movie reviews</h2>
      <div className={css.containerItem}>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className={review.completed ? css.completed : css.pending}
            >
              <h3 className={css.name}>
                Author: {review.author_details.username}
              </h3>
              <p className={css.text}>
                {"'"}
                {review.content}
                {"'"}
              </p>
            </div>
          ))
        ) : (
          <p className={css.noReviews}>No reviews yet...</p>
        )}
      </div>
    </div>
  )
}
