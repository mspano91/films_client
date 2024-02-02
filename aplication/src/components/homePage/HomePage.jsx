"use client";
import { setAllMovies } from "@/redux/slice";
import { fetchData } from "@/utils/services/fetchData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.allMovies);

  const fetchMovies = async () => {
    const filmes = await fetchData();
    dispatch(setAllMovies(filmes));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="border border-red-500 p-4 flex flex-col items-center justify-center w-200">
      <SearchBar />
      <h1> este va ser el main puta madre</h1>
      {movies
        ? movies.map((mov, index) => (
            <div key={index}>
              <h1>{mov.title}</h1>
            </div>
          ))
        : null}
    </div>
  );
};

export default HomePage;
