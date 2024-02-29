"use client";

import SearchBar from "./searchBar/SearchBar";

export default function Nav({ searchMovies }) {
  return (
    <>
      <div className="w-full flex justify-center lg:fixed xl:fixed z-50 mb-6">
        <div className="z-50 mt-10 xl:flex xl:flex-row lg:flex lg:flex-row xl:px-12 lg:px-12 xl:justify-between lg:justify-between">
          <div className="flex flex-row items-center rounded-l-md bg-black bg-opacity-75">
            <button className="xl:text-xl  text-blue-500 text-xs font-bold  pl-3 pr-3 h-[50px]  hover:text-blue-500">
              STREAM +
            </button>
            <button className="xl:text-xl text-white text-xs pl-3 pr-3 h-[50px]  hover:text-blue-500">
              Movies
            </button>
            <button className="xl:text-xl text-white text-xs pl-3 pr-3 h-[50px]  hover:text-blue-500">
              Series
            </button>
            <button className="xl:text-xl text-white text-xs pl-3 pr-3 h-[50px]  hover:text-blue-500">
              Categories
            </button>
            <button className="xl:text-xl text-white text-xs pl-3 pr-3  hover:text-blue-500">
              My space
            </button>
          </div>
          <div className="flex   ">
            <SearchBar searchMovies={searchMovies} />
          </div>
        </div>
      </div>
    </>
  );
}
