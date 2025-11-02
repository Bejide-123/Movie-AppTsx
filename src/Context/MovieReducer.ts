import type { Movie } from "../Types/movieType";

export interface MovieState {
  favorites: Movie[];
  searchQuery: string;
}

export type MovieAction =
  | { type: "ADD_FAVORITE"; payload: Movie }
  | { type: "REMOVE_FAVORITE"; payload: number }
  | { type: "TOGGLE_FAVORITE"; payload: Movie }
  | { type: "LOAD_FAVORITES"; payload: Movie[] }
  | { type: "SET_SEARCH_QUERY"; payload: string };

export const initialState: MovieState = {
  favorites: [],
  searchQuery: "",
};

export const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.some((movie) => movie.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((movie) => movie.id !== action.payload),
      };

    case "TOGGLE_FAVORITE":
      const exists = state.favorites.some((movie) => movie.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          favorites: state.favorites.filter((movie) => movie.id !== action.payload.id),
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }

    case "LOAD_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};