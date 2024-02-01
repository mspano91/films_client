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
  },
});

// Action creators are generated for each case reducer function
export const { setAllMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
