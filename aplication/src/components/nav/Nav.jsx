"use client";

import SearchBar from "./searchBar/SearchBar";

export default function Nav({ searchMovies }) {
  return (
    <>
      <div className=" w-full mt-10 flex pl-12 items-center ">
        <div className="z-50 fixed items-center  h-[50px] rounded-lg bg-slate-900">
          <button className="text-white pl-3 pr-3 h-[50px]  hover:text-blue-500">
            Movies
          </button>
          <button className="text-white pl-3 pr-3 h-[50px]  hover:text-blue-500">
            Series
          </button>
          <button className="text-white pl-3 pr-3 h-[50px]  hover:text-blue-500">
            Categories
          </button>
          <button className="text-white pl-3 pr-3  hover:text-blue-500">
            My space
          </button>
        </div>
      </div>
      <SearchBar searchMovies={searchMovies} />;
    </>
  );
}
