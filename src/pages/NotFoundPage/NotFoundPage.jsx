import { Link } from 'react-router-dom'
import css from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div>
      <p>
        404 PAGE NOT FOUND! {''}
        <Link className={css.link} to="/movies">
          Return
        </Link>
      </p>
    </div>
  )
}
