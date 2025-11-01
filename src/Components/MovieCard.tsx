import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Movie } from "../Types/movieType";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : "N/A";

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group"
    >
      <div className="bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all duration-300">
        {/* Movie Poster */}
        <div className="relative overflow-hidden aspect-2/3">
          <img 
            src={imageUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("Add to favorites:", movie.id);
            }}
            className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 p-1.5 rounded-full transition backdrop-blur-sm"
            aria-label="Add to favorites"
          >
            <Heart className="w-4 h-4 text-white" />
          </button>

          {/* Rating Badge */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 rounded backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-blue-400 transition">
            {movie.title}
          </h3>
          
          <p className="text-xs text-slate-400 mt-1">
            {releaseYear}
          </p>
        </div>
      </div>
    </Link>
  );
}