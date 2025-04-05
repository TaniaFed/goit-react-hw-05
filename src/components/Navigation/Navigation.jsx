import css from './Navigation.module.css'
import { NavLink } from 'react-router-dom'
import { BiCameraMovie } from 'react-icons/bi'
import clsx from 'clsx'

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active)
}

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <div className={css.icon}>
          <BiCameraMovie className="my-icon" size="35" />
        </div>

        <ul className={css.list}>
          <li>
            <NavLink to="/" className={getLinkStyles}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={getLinkStyles}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
