import React from "react";

export default function SearchBar() {
  return (
    <div>
      <form className="container mb-4" action="">
        <input className="text-black" type="text" placeholder="search film" />
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          search
        </button>
      </form>
    </div>
  );
}
