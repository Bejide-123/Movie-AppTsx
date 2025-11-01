import { createContext, useContext, useReducer, useEffect } from "react";
import { movieReducer, initialState } from "./MovieReducer";
import type { MovieState, MovieAction } from "./MovieReducer"
import type { Movie } from "../Types/movieType";
import type { ReactNode } from "react";

interface MovieContextType {
  state: MovieState;
  dispatch: React.Dispatch<MovieAction>;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieFavorites");
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: "LOAD_FAVORITES", payload: favorites });
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  // Helper functions
  const addFavorite = (movie: Movie) => {
    dispatch({ type: "ADD_FAVORITE", payload: movie });
  };

  const removeFavorite = (movieId: number) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: movieId });
  };

  const toggleFavorite = (movie: Movie) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: movie });
  };

  const isFavorite = (movieId: number) => {
    return state.favorites.some((movie) => movie.id === movieId);
  };

  return (
    <MovieContext.Provider
      value={{
        state,
        dispatch,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use the context
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within MovieProvider");
  }
  return context;
};