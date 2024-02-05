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
  const [movie, setMovie] = useState({ title: "Loading Movies" });

  const fetchMovies = async () => {
    const filmes = await fetchData();
    dispatch(setAllMovies(filmes));
  }; //esta funcion trae la info de la api y la mete en el redux, donde despues la llamamos arriba como movie.

  const fetchTrailer = async (id) => {
    console.log(id); //llega el id perfecto
    try {
      const trailers = await fetchTrailers(id);
      console.log(`aca estan los ${trailers}`); //ACA ESTA EL PROBLEMA NO RECIBE LA INFO
      // setTrailer(trailers);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const selectMovie = async (selectedMovie) => {
    fetchTrailer(selectedMovie.id);
    console.log(`aca estan los ${selectedMovie.name}`);
    console.log(selectedMovie.id);
    setMovie(selectedMovie);
    window.scrollTo(0, 0);

    if (movie) {
      nuevaPortada();
    }
  };

  const nuevaPortada = (selectedMovieId) => {
    const selectedMovie = reduxMovies.find((mov) => mov.id === selectedMovieId);
    console.log(selectedMovie);
    if (selectedMovie) {
      setPortada(selectedMovie);
      fetchTrailer(selectedMovie.id);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    nuevaPortada();
  }, [movie]);

  return (
    <div>
      <div>
        {movie ? (
          <div className="relative w-full " style={{ paddingTop: "45%" }}>
            <img
              class="absolute  bottom-10 left-0 w-full h-full object-cover mb-18"
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
