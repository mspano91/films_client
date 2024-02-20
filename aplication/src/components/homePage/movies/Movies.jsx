import { setAllMovies } from "@/redux/slice";
import { fetchData, fetchTrailers } from "@/utils/services/fetchData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";

const URL_IMAGE = "https://image.tmdb.org/t/p/original";

export default function Movies() {
  const dispatch = useDispatch();
  const reduxMovies = useSelector((state) => state.movies.allMovies);
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [portada, setPortada] = useState(null);
  const [movie, setMovie] = useState(null);

  const fetchMovies = async () => {
    const filmes = await fetchData(); //bring movie data from the back
    dispatch(setAllMovies(filmes)); //put de data into redux state
    setMovie(filmes[0]); //setting portada default
  };

  const nuevaPortada = (selectedMovieId) => {
    const selectedMovie = reduxMovies.find((mov) => mov.id === selectedMovieId); //taking body information to show different portada
    if (selectedMovie) {
      setPortada(selectedMovie);
      // fetchTrailer(selectedMovie.id);
    }
  };

  const selectMovie = async (selectedMovie) => {
    setMovie(selectedMovie);
    fetchTrailer(selectedMovie.id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (movie) {
      nuevaPortada();
    }
  };

  const fetchTrailer = async (id) => {
    // console.log(id);
    try {
      const response = await fetchTrailers(id);
      console.log(response.key);
      setTrailer(response.key);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    fetchMovies(); // call movies array
  }, []);

  useEffect(() => {
    nuevaPortada();
  }, [reduxMovies, movie]); // when movie state change, useEffect call again nuevaPortada function to update

  return (
    <div>
      <div className="relative w-full flex justify-center  items-center">
        {movie ? (
          // <div style={{ paddingTop: "40%" }}>
          <div
            style={{ paddingTop: "40%" }}
            className="relative w-full max-w-[700px] h-[300px] sm:max-w-full border border-pink-500"
          >
            <img
              className={`absolute bottom-0 left-0 w-full h-full object-cover mb-18 z-1 
              ${playing ? "hidden" : ""}`}
              src={`${URL_IMAGE + movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="flex flex-column w-[700px] h-[300px] gap-1 absolute left-10 bottom-10 border border-blue-500">
              <p className="flex text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {movie.title}
              </p>
              <p className="flex absolute text-l w-[700px] top-20 ">
                {movie.overview}
              </p>
            </div>
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
            {playing && (
              <button
                onClick={() => setPlaying(false)}
                className="absolute left-20  bottom-10 -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded"
              >
                Close Trailer
              </button>
            )}
            {!playing && (
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20 flex">
                {trailer ? (
                  <>
                    <button
                      onClick={() => setPlaying(true)}
                      className="bg-blue-500 text-white px-3 py-1 rounded "
                    >
                      Play Trailer
                    </button>
                  </>
                ) : null}
              </div>
            )}
          </div>
        ) : null}
      </div>
      {/* taking poster from redux state */}
      <h1 className="text-5xl m-12"> Latest releases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-12">
        {reduxMovies
          ? reduxMovies.map((mov, index) => (
              <div key={index} onClick={() => selectMovie(mov)}>
                <img
                  className="h-[700px] "
                  src={`${URL_IMAGE + mov.poster_path}`}
                  alt=""
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
