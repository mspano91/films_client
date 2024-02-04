import { setAllMovies } from "@/redux/slice";
import { fetchData, fetchTrailers } from "@/utils/services/fetchData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const URL_IMAGE = "https://image.tmdb.org/t/p/original";

export default function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.allMovies);
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);

  const fetchMovies = async () => {
    const filmes = await fetchData();
    dispatch(setAllMovies(filmes));
  };

  const fetchTrailer = async () => {
    const trailers = await fetchTrailers();
    setTrailer(trailers);
  };

  useEffect(() => {
    fetchMovies();
    fetchTrailer();
  }, []);

  return (
    <div>
      <div>
        <main>
          {movies ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${URL_IMAGE}${movies.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
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
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1 className="text-white">{movies.title}</h1>
                    <p className="text-white">{movies.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>

      <h1> latest releases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {movies
          ? movies.map((mov, index) => (
              <div key={index}>
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
