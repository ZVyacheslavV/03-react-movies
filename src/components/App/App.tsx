import { useState /* , useEffect */ } from 'react';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import { Toaster } from 'react-hot-toast';
import { notifyEmpty } from '../../services/notifications';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);

      const data = await fetchMovies(topic);

      if (data.length === 0) {
        notifyEmpty();
        setMovies([]);
      } else setMovies(data);
    } catch {
      setIsError(true);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}
