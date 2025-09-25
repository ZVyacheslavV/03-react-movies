import axios from 'axios';
import type { Movie } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

const BASE_URL = 'https://api.themoviedb.org/3';
const API_ENDPOINTS = {
  SEARCH: '/search/movie',
  DISCOVER: '/discover/movie',
  FIND: '/find',
};
// const MOVIES_PER_PAGE = 12;

axios.defaults.baseURL = BASE_URL;

interface MoviesHttpResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const options = {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const {
    data: { results },
  } = await axios.get<MoviesHttpResponse>(API_ENDPOINTS.SEARCH, options);

  return results;
};
