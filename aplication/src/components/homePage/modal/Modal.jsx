"use client";
import YouTube from "react-youtube";
import { useState } from "react";
const URL_IMAGE = "https://image.tmdb.org/t/p/original";

export default function Modal({
  modal,
  handleModal,
  playing,
  setPlaying,
  trailer,
  movie,
}) {
  //this a state and next function to cut the extended overview, just for show a little description

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex justify-center items-center ${
        modal ? "" : "hidden"
      }`}
    >
      <div
        className={
          "relative w-[900px] h-[700px] flex justify-center items-center rounded-xl  bg-zinc-950"
        }
      >
        {playing && trailer && (
          <YouTube
            videoId={trailer}
            className="absolute top-0 left-0 w-full h-full"
            containerClassName="youtube-container"
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                controls: 0,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
              },
            }}
          />
        )}

        {!playing && (
          <>
            <div className="absolute top-0 z-40">
              {movie && (
                <>
                  <img
                    src={`${URL_IMAGE + movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full rounded-t-xl "
                  />
                  <h1 className="absolute text-white text-left text-4xl bottom-16 pl-6 ">
                    {movie.title}
                  </h1>
                </>
              )}
            </div>
            <div className="absolute bg-zinc-950 rounded-b-xl bottom-0 p-6 z-50 w-[1200]">
              <p className="text-white pb-9 text-base">{movie.overview}</p>
            </div>
            <div className="absolute z-50 left-1/2 transform -translate-x-1/2 bottom-72 flex cursor-pointer ">
              {trailer && (
                <button
                  onClick={() => setPlaying(true)}
                  className="w-[200px] bg-blue-500 hover:bg-blue-700  text-white px-3 py-1 rounded "
                >
                  Play trailer
                </button>
              )}
            </div>
            <button
              className="z-40 absolute top-2 right-2 m-4 bg-gray-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleModal()}
            >
              X
            </button>
          </>
        )}

        {playing && (
          <button
            onClick={() => setPlaying(false)}
            className="absolute left-20  bottom-10 -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
