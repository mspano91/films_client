"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const [theme, setTheme] = useState("dark");

  const handleHtmlDarkAttribute = (value) => {
    if (value === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  };

  const handleDarkMode = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      handleHtmlDarkAttribute(newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    handleHtmlDarkAttribute(theme);
  }, []);

  return (
    <div className="flex flex-col items-center pt-10">
      <div>
        <p className="text-5xl mb-5 dark:text-white">Stream +</p>
      </div>
      <div className="w-full flex justify-center">
        {/* this button is for darkMood just triying */}
        <form className="flex gap-2 container mb-4" action="">
          <input
            type="text"
            placeholder="search..."
            className="w-full p-3 texto-semibold bg-black bg-opacity-15 dark:bg-white dark:bg-opacity-25 rounded-md border border-transparent focus:border-purple-500 dark:focus:border-blue-500 focus:outline-none transition duration-300 "
          />
          <button className="rounded-md border p-3 text-lg font-semibold bg-gray-900 cursor-pointer transition duration-250 focus:outline-none focus:border-blue-500 focus-visible:outline-blue-500 hover:border-blue-500">
            search
          </button>
          <button
            type="button"
            onClick={handleDarkMode}
            className="flex border bottom-2 p-3 font-semibold bg-gray-900 hover:bg-blue-600 rounded-lg  items-center focus-visible:outline-blue-500"
          >
            {" "}
            light{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
