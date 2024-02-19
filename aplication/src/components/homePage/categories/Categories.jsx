import {
  fetchCategories,
  fetchById,
  fetchTrailers,
  fetchTrailersCat,
} from "@/utils/services/fetchData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategories } from "@/redux/slice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import YouTube from "react-youtube";
import Modal from "../modal/Modal";

const URL_IMAGE = "https://image.tmdb.org/t/p/original";

export default function Categories() {
  const categories = useSelector((state) => state.movies.categories);
  const dispatch = useDispatch();
  const [sectionsByCategory, setSectionsByCategory] = useState({});
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState(null);
  const [modal, setModal] = useState(false);

  const fetchCat = async () => {
    const cat = await fetchCategories();
    dispatch(setAllCategories(cat)); //taking categories array and saving into redux state
  };

  const fetchSections = async (id) => {
    try {
      const sections = await fetchById(id);
      setSectionsByCategory((prevSections) => ({
        ...prevSections,
        [id]: sections,
      }));
    } catch (error) {
      console.error("Error fetching sections for category with ID", id, error);
    }
  };

  const selectMovie = (selectedMovie) => {
    setMovie(selectedMovie);

    // Llamar a fetchTrailer después de actualizar el estado de la película
  };

  const fetchTrailer = async (id) => {
    console.log(id);
    try {
      const response = await fetchTrailersCat(id);
      console.log(response.id);

      // Comprobar si la película en el estado es la misma que la obtenida del servidor
      if (movie.id === response.id) {
        const official = response.videos?.results;
        const officialTrailer = official.find(
          (vid) => vid.name === "Official Trailer"
        );
        if (officialTrailer) {
          setTrailer(officialTrailer.key);
        } else {
          console.log("No se encontró el tráiler oficial.");
        }
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  console.log(trailer);
  console.log(movie);

  useEffect(() => {
    fetchCat();
  }, []);

  useEffect(() => {
    if (movie) {
      fetchTrailer(movie.id);
    }
  }, [movie]);

  useEffect(() => {
    if (categories) {
      categories.forEach((cat) => {
        fetchSections(cat.id);
      });
    }
  }, [categories]);

  //carrousel confi
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const handleModal = (mov) => {
    setModal(!modal);
    selectMovie(mov);
    setTrailer(mov.id);
  };

  return (
    <>
      <div className="border border-blue-500 m-12">
        {categories &&
          categories.map((cat) => (
            <div key={cat.id} className="mb-8 ">
              <h1 className="text-3xl font-bold mb-4 m-12">{cat.name}</h1>

              <Slider {...settings}>
                {sectionsByCategory[cat.id] &&
                  sectionsByCategory[cat.id].map((mov, secIndex) => (
                    <div
                      className="border border-yellow-500 p-4"
                      key={secIndex}
                    >
                      <h1 className="font-roboto text-s overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {mov.title}
                      </h1>
                      <img
                        src={`${URL_IMAGE + mov.backdrop_path}`}
                        alt={mov.title}
                        className="w-full h-auto"
                      />
                      {/* <button
                        onClick={() => selectMovie(mov)}
                        className="border border-blue-500 p-2"
                      >
                        info
                      </button> */}
                      <button
                        onClick={() => handleModal(mov)}
                        className="border border-blue-500 p-2"
                      >
                        modal
                      </button>
                    </div>
                  ))}
              </Slider>
            </div>
          ))}
      </div>
      <div></div>
      {}
      {modal && (
        <Modal
          modal={modal}
          handleModal={handleModal}
          setPlaying={setPlaying}
          trailer={trailer}
          playing={playing}
          movie={movie}
        />
      )}
    </>
  );
}
