import { useEffect, useState } from "react";
import { fetchPopularMovies, searchMovies } from "../Services/api";
import MovieCard from "./MovieCard";
import { useMovieContext } from "../Context/MovieContext";
import type { Movie } from "../Types/movieType";

export default function CardListing() {
  const { state } = useMovieContext();
  const searchQuery = state.searchQuery;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        // If there's a search query, search. Otherwise, get popular movies
        const data = searchQuery 
          ? await searchMovies(searchQuery)
          : await fetchPopularMovies();
        
        setMovies(data.results);
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [searchQuery]); // Re-fetch when search query changes

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  // Movies Grid
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
      </h1>
      {searchQuery && (
        <p className="text-slate-400 mb-6">
          Found {movies.length} result{movies.length !== 1 ? 's' : ''}
        </p>
      )}
      
      {movies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No movies found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}