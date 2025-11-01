import axios from "axios";
import type { MoviesResponse, MovieDetails } from "../Types/movieType";

// ✅ Load from .env
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL as string;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

// ✅ Create Axios instance
const axiosClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchPopularMovies = async (page: number = 1): Promise<MoviesResponse> => {
  const response = await axiosClient.get<MoviesResponse>("/movie/popular", {
    params: { page },
  });
  return response.data;
};

export const searchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
  const response = await axiosClient.get<MoviesResponse>("/search/movie", {
    params: { query, page },
  });
  return response.data;
};

export const fetchMovieById = async (id: number): Promise<MovieDetails> => {
  const response = await axiosClient.get<MovieDetails>(`/movie/${id}`);
  return response.data;
};