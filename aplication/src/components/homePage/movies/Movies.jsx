import { setAllMovies, setAllSearch, setReset } from "@/redux/slice";
import {
  fetchData,
  fetchTrailers,
  fetchSearch,
} from "@/utils/services/fetchData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";
import Nav from "@/components/nav/Nav";
import Loading from "@/utils/loader/Loading";

const URL_IMAGE = "https://image.tmdb.org/t/p/original";

export default function Movies() {
  const dispatch = useDispatch();
  const reduxMovies = useSelector((state) => state.movies.allMovies);
  const reduxSearchKey = useSelector((state) => state.movies.Allsearch);
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [portada, setPortada] = useState(null);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    const filmes = await fetchData(); //bring movie data from the back
    dispatch(setAllMovies(filmes)); //put de data into redux state
    setMovie(filmes[0]); //setting portada default
    setIsLoading(false);
  };

  // function to search through searchbar
  const fetchKeyWord = async (searchKey) => {
    // console.log(searchKey);
    const keyWord = await fetchSearch(searchKey);
    // console.log(keyWord);
    if (keyWord === undefined) {
      return;
    }
    if (keyWord.length > 0) {
      dispatch(setAllSearch(keyWord));
      setMovie(keyWord[0]);
    }
  };

  const nuevaPortada = (selectedMovieId) => {
    const selectedMovie = reduxMovies.find((mov) => mov.id === selectedMovieId);
    //taking body information to show different portada
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
      // console.log(response.key);
      setTrailer(response.key);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const searchMovies = (searchKey) => {
    // console.log(searchKey);
    fetchKeyWord(searchKey);
  };

  const truncateOverview = (overview) => {
    const words = overview.split(" ");
    if (words.length >= 40) {
      return words.slice(0, 40).join(" ");
    } else {
      return overview;
    }
  };

  const handleReset = () => {
    dispatch(setReset());
    setIsLoading(false);
    setMovie(reduxMovies[0]);
  };

  useEffect(() => {
    fetchMovies(); // call movies array
  }, []);

  useEffect(() => {
    nuevaPortada();
  }, [reduxMovies, movie]); // when movie state change, useEffect call again nuevaPortada function to update

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Nav searchMovies={searchMovies} />

          <div className="relative w-full flex justify-center items-center">
            {movie ? (
              <div
                style={{ paddingBottom: "45%" }}
                className="relative w-full max-w-[700px] h-[300px] sm:max-w-full"
              >
                <div
                  className={`absolute bottom-0 left-0 w-full h-full z-1 ${
                    playing ? "hidden" : ""
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), url(${
                      URL_IMAGE + movie.backdrop_path
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="flex flex-column w-10/12 h-[250px] gap-1 absolute left-0 bottom-10">
                    <p className="flex text-3xl xl:text-5xl p-6 text-white">
                      {movie.title}
                    </p>
                    <p className="flex absolute text-transparent text-lg md:text-white w-full top-20 p-4">
                      {truncateOverview(movie.overview) + "..."}
                    </p>
                  </div>
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
                    className="absolute left-20 bottom-10 -translate-x-1/2 bg-gray-800 hover:bg-red-400 text-white px-3 py-1 rounded"
                  >
                    Close Trailer
                  </button>
                )}
                {!playing && (
                  <>
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex xl:bottom-1/4 lg:bottom-40 md:bottom-40 bottom-10">
                      {trailer ? (
                        <>
                          <button
                            onClick={() => setPlaying(true)}
                            className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                          >
                            Play Trailer
                          </button>
                        </>
                      ) : null}
                    </div>
                    <div>
                      <button
                        onClick={handleReset}
                        className="z-1 absolute top-0 right-6 m-4 bg-gray-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        X
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </div>
          {/* taking poster from redux state */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-12">
            {reduxSearchKey.length > 0
              ? reduxSearchKey.map((mov, index) => (
                  <div key={index} onClick={() => selectMovie(mov)}>
                    <img
                      className="z-1 h-[700px] "
                      src={`${URL_IMAGE + mov.poster_path}`}
                      alt=""
                    />
                  </div>
                ))
              : reduxMovies &&
                reduxMovies.map((mov, index) => (
                  <div key={index} onClick={() => selectMovie(mov)}>
                    <img
                      className="z-1  h-[700px] "
                      src={`${URL_IMAGE + mov.poster_path}`}
                      alt=""
                    />{" "}
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
}
