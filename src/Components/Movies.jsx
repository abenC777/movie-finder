import MoviesList from './MoviesList'
import NoMoviesResults from './NoMoviesResults'

function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  return hasMovies ? <MoviesList movies={movies} /> : <NoMoviesResults />
}

export default Movies
