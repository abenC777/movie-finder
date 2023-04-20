import { useCallback, useState } from 'react'
import './App.css'
import useSearch from './hooks/useSearch'
import useMovies from './hooks/useMovies'
import Movies from './Components/Movies'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, loading, getMovies, moviesError } = useMovies({
    search,
    sort
  })

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const handleSort = () => {
    setSort(!sort)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movies Finder!</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            name='query'
            placeholder='Avengers, Star Wars, Harry Potter...'
            value={search}
          />
          <label htmlFor='sort_check'>
            Sort Movies
            <input id='sort_check' type='checkbox' onChange={handleSort} />
          </label>
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? (
          <p>Loading...</p>
        ) : search ? (
          <Movies movies={movies} />
        ) : null}
      </main>
    </div>
  )
}

export default App
