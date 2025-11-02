import { useMovieContext } from "../Context/MovieContext";
import MovieCard from "../Components/MovieCard";
import Navbar from "../Components/Navbar";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const { state } = useMovieContext();
  const { favorites } = state;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-3xl font-bold text-white">My Favorites</h1>
            <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {favorites.length}
            </span>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400 text-lg mb-2">No favorites yet</p>
              <p className="text-slate-500">
                Click the heart icon on any movie to add it to your favorites
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
