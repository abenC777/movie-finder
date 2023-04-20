import { useRef, useState, useMemo, useCallback } from 'react'
import searchMovies from '../services/movies'

/**
 * This is a custom hook in JavaScript that returns a sorted list of movies based on a search query and
 * loading status.
 * @returns An object with three properties: "movies", "getMovies", and "loading".
 */
export default function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const [moviesError, setMoviesError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setMoviesError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setMoviesError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, moviesError }
}
