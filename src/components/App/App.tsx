import { useState /* , useEffect */ } from 'react';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import { Toaster } from 'react-hot-toast';
import { notifyEmpty } from '../../services/notifications';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(topic);
      if (data.length === 0) notifyEmpty();

      setMovies(data);
    } catch {
      setIsError(true);
    }
    setIsLoading(false);
  };
  /*   const [clicks, setClicks] = useState(0);

  useEffect(() => {
    console.log('You can see me only once!');

    const handleSearch = async () => console.log(await fetchMovies('dog'));
    handleSearch();
  }, [clicks]); */

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <SearchBar onSubmit={handleSearch} />
      {/* movies.length > 0 && */ <MovieGrid />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </>
  );
  /*     <button onClick={() => setClicks(clicks + 1)}>
      You clicked {clicks} times
    </button> */
}
