import React from "react";

export default function SearchBar() {
  return (
    <div className="flex flex-col items-center  pt-10">
      <div>
        <p className="text-5xl mb-5">Stream +</p>
      </div>
      <div className="w-[1500px]">
        <form className="container mb-4" action="">
          <input
            type="text"
            placeholder="what are you looking for?"
            className="w-full p-3 texto-semibold bg-white bg-opacity-25 rounded-md border border-transparent focus:border-purple-500 focus:outline-none transition duration-300 w-[1500px]"
          />
          {/* <button className="rounded-md border p-3 text-lg font-semibold bg-gray-900 cursor-pointer transition duration-250 focus:outline-none focus:border-blue-500 focus-visible:outline-blue-500 hover:border-blue-500">
          search
        </button> */}
        </form>
      </div>
    </div>
  );
}
