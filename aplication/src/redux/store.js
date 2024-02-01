import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
