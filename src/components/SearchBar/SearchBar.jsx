import style from './SearchBar.module.css'
import { useState } from 'react'
import toast from 'react-hot-toast'

const notify = () => toast('Enter search requirements!')

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('')

  const handleInput = (event) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!query.trim()) {
      return notify()
    }

    onSubmit(query)

    setQuery(query)
  }

  return (
    <form className={style.formBox} onSubmit={handleSubmit}>
      <input
        className={style.input}
        onChange={handleInput}
        name="search"
        value={query}
        type="text"
        autoFocus
        placeholder="Movie search"
      />
      <button className={style.button} type="submit">
        Search
      </button>
    </form>
  )
}

export default SearchBar
