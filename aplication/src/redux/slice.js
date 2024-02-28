import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMovies: [],
  Allsearch: [],
  categories: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setAllMovies: (state, action) => {
      state.allMovies = action.payload;
    },

    setReset: (state, action) => {
      state.Allsearch = [];
    },

    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    setAllSearch: (state, action) => {
      state.Allsearch = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllMovies, setAllCategories, setAllSearch, setReset } =
  moviesSlice.actions;

export default moviesSlice.reducer;
