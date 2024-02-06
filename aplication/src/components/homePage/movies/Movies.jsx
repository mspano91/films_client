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
    setMovie(filmes[0]); //setting portada
  };

  const nuevaPortada = (selectedMovieId) => {
    const selectedMovie = reduxMovies.find((mov) => mov.id === selectedMovieId); //taking body information to show different portada
    if (selectedMovie) {
      setPortada(selectedMovie);
      // fetchTrailer(selectedMovie.id);
    }
  };

  const selectMovie = async (selectedMovie) => {
    fetchTrailer(selectedMovie.id);
    setMovie(selectedMovie);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (movie) {
      nuevaPortada();
    }
  };

  const fetchTrailer = async (id) => {
    console.log(id); //llega el id perfecto
    try {
      const response = await fetchTrailers(id);

      console.log(response); //ACA ESTA EL PROBLEMA NO RECIBE LA INFO
      setTrailer(response);
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
      <div>
        {movie ? (
          <div className="relative w-full " style={{ paddingTop: "40%" }}>
            <img
              className="absolute  bottom-10 left-0 w-full h-full object-cover mb-18"
              src={`${URL_IMAGE + movie.backdrop_path}`}
              alt={movie.title}
            />
            {playing ? (
              <>
                <YouTube
                  videoId={trailer.key}
                  className="reproductor container w-full h-600"
                  containerClassName={"youtube-container amru"}
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
                <button onClick={() => setPlaying(false)}>Close</button>
              </>
            ) : (
              <div>
                <div className="">
                  {trailer ? (
                    <button onClick={() => setPlaying(true)} type="button">
                      Play Trailer
                    </button>
                  ) : (
                    "Sorry, no trailer available"
                  )}
                  {/* <h1 className="text-white">{trailer.title}</h1>
                  <p className="text-white">{trailer.overview}</p> */}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <h1> latest releases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {reduxMovies
          ? reduxMovies.map((mov, index) => (
              <div key={index} onClick={() => selectMovie(mov)}>
                <img
                  className="border border-blue-400 h-[700px] "
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
