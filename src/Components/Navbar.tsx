import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, Film, Menu, X } from "lucide-react";
import type { FormEvent, ChangeEvent, JSX } from "react";
import { useMovieContext } from "../Context/MovieContext";

export default function Navbar(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  
  
  const { state } = useMovieContext();
  const favoritesCount = state.favorites.length;

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <Film
              className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition"
              aria-hidden
            />
            <span className="text-xl font-semibold text-white select-none">
              Movie<span className="text-blue-500">Hub</span>
            </span>
          </Link>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
                  aria-hidden
                />
                <input
                  type="text"
                  placeholder="Search for movies..."
                  className="w-full bg-slate-800 text-white pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-slate-500"
                  value={searchQuery}
                  onChange={handleInputChange}
                  aria-label="Search for movies"
                />
              </div>
            </form>
          </div>

          {/* Right: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium relative"
            >
              <Heart className="w-4 h-4" />
              Favorites
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            {/* Mobile Search */}
            <div className="mb-4 px-2">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
                    aria-hidden
                  />
                  <input
                    type="text"
                    placeholder="Search for movies..."
                    className="w-full bg-slate-800 text-white pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-slate-500"
                    value={searchQuery}
                    onChange={handleInputChange}
                    aria-label="Search movies"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Links */}
            <div className="space-y-1 px-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium"
              >
                Home
              </Link>
              <Link
                to="/favorites"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium relative"
              >
                <Heart className="w-4 h-4" aria-hidden />
                Favorites
                {favoritesCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}