import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMovies: [],
  copyMovies: [],
  categories: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setAllMovies: (state, action) => {
      state.allMovies = action.payload;
      state.copyMovies = action.payload;
    },
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllMovies, setAllCategories } = moviesSlice.actions;

export default moviesSlice.reducer;
