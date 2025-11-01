import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieById } from "../Services/api";
import { Star, Calendar, Clock, ArrowLeft, Heart } from "lucide-react";
import type { MovieDetails } from "../Types/movieType";
import { useMovieContext } from "../Context/MovieContext";

export default function MovieDetailPage() {
  const { toggleFavorite, isFavorite } = useMovieContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await fetchMovieById(Number(id));
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error State
  if (error || !movie) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error || "Movie not found"}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // ✅ NOW we can safely use movie because we've checked it exists above
  const isMovieFavorite = isFavorite(movie.id);

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Backdrop Image with Overlay */}
      <div className="relative h-[500px] w-full">
        {backdropUrl && (
          <>
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
          </>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-slate-900/80 hover:bg-slate-900 text-white px-4 py-2 rounded-lg transition backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* Movie Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full md:w-80 rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-slate-400 italic text-lg mb-4">"{movie.tagline}"</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-slate-400 text-sm">({movie.vote_count.toLocaleString()} votes)</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>{releaseYear}</span>
              </div>

              {movie.runtime && (
                <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>{movie.runtime} min</span>
                </div>
              )}

              <button
                onClick={() => toggleFavorite(movie)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition ${
                  isMovieFavorite 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                <Heart className={`w-5 h-5 ${isMovieFavorite ? "fill-white" : ""}`} />
                {isMovieFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-slate-800 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-slate-300 leading-relaxed">
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-slate-400 text-sm mb-1">Status</h3>
                <p className="font-medium">{movie.status}</p>
              </div>

              {movie.budget > 0 && (
                <div>
                  <h3 className="text-slate-400 text-sm mb-1">Budget</h3>
                  <p className="font-medium">${movie.budget.toLocaleString()}</p>
                </div>
              )}

              {movie.revenue > 0 && (
                <div>
                  <h3 className="text-slate-400 text-sm mb-1">Revenue</h3>
                  <p className="font-medium">${movie.revenue.toLocaleString()}</p>
                </div>
              )}

              {movie.original_language && (
                <div>
                  <h3 className="text-slate-400 text-sm mb-1">Original Language</h3>
                  <p className="font-medium uppercase">{movie.original_language}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
}