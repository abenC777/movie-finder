import { useEffect, useRef, useState } from 'react'

export default function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('Can not search an empty term')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('Can not search a movie that contains only numbers')
      return
    }

    if (search.length < 3) {
      setError('Search term must be at least 3 characters long')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}
