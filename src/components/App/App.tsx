import { useState, useEffect } from 'react';
import { fetchMovies } from '../../services/movieService';

export default function App() {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    console.log('You can see me only once!');

    const handleSearch = async () => console.log(await fetchMovies('dog'));
    handleSearch();
  }, [clicks]);

  return (
    <button onClick={() => setClicks(clicks + 1)}>
      You clicked {clicks} times
    </button>
  );
}
