"use client";
import YouTube from "react-youtube";
const URL_IMAGE = "https://image.tmdb.org/t/p/original";

export default function Modal({
  modal,
  handleModal,
  playing,
  setPlaying,
  trailer,
  movie,
}) {
  console.log(modal);
  console.log(playing);
  console.log(movie);
  console.log(trailer);
  return (
    <div
      //div modal wich fix modal in the middle of the screen
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex justify-center items-center ${
        modal ? "" : "hidden"
      }`}
    >
      <div
        className={
          "relative w-[900px] h-[700px] flex justify-center items-center rounded-xl  bg-zinc-950"
        }
      >
        {/* if we have trailer and setplaying ON, so show the trailer */}
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

        {/* if we didnt turn ON play trailer so show me the poster and information, also buttom play and close */}
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
              <div className="relative  w-full flex justify-start h-8">
                <p className="text-xl  bottom-0 ">
                  {movie.vote_average.toString().slice(0, 3)}⭐
                </p>
                <p className="text-xl  bottom-0 left-14">
                  {movie.release_date.slice(0, 4)}
                </p>
              </div>
            </div>
            <div className="absolute z-50 left-1/2 transform -translate-x-1/2 bottom-72 flex cursor-pointer ">
              {trailer && typeof trailer === "string" && (
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

        {/* if playing is ON sho me the x button to quit it */}
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
