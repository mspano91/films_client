"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function SearchBar({ searchMovies }) {
  const [theme, setTheme] = useState("dark");
  const [searchKey, setSearchKey] = useState("");

  const handleHtmlDarkAttribute = (value) => {
    if (value === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  };

  // const handleDarkMode = () => {
  //   setTheme((prevTheme) => {
  //     const newTheme = prevTheme === "dark" ? "light" : "dark";
  //     handleHtmlDarkAttribute(newTheme);
  //     return newTheme;
  //   });
  // };

  useEffect(() => {
    handleHtmlDarkAttribute(theme);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searchKey);
    searchMovies(searchKey); // Llama a la función handleSearch pasada desde Movies
    setSearchKey("");
  };

  return (
    <div className="z-49  w-full flex h-[50px] xl:mr-20 rounded-r-md bg-black bg-opacity-75">
      <div className="xl:w-[400px] w-full lg:w-[400px] flex">
        <form
          className="flex gap-2 container mb-4"
          onSubmit={handleSearchSubmit}
        >
          <input
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
            type="text"
            placeholder="search by title..."
            className="w-full px-8 text-black h-[50px] dark:text-white bg-black bg-opacity-15 dark:bg-white dark:bg-opacity-25 rounded-r-md border border-transparent focus:border-purple-500 dark:focus:border-blue-500 focus:outline-none transition duration-300 "
          />
          {/* <button className="category rounded-md border p-3 text-lg font-thin text-white bg-gray-900 cursor-pointer transition duration-250 focus:outline-none focus:border-blue-500 focus-visible:outline-blue-500 hover:border-blue-500">
            search
          </button> */}
          {/* <button
            type="button"
            onClick={handleDarkMode}
            className="flex border bottom-2 p-3 font-thin text-white bg-gray-900 hover:bg-blue-600 rounded-lg  items-center focus-visible:outline-blue-500"
          >
            {" "}
            light{" "}
          </button> */}
        </form>
      </div>
    </div>
  );
}
