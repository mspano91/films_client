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

  //taking categories array and saving into redux state
  const fetchCat = async () => {
    const cat = await fetchCategories();
    dispatch(setAllCategories(cat));
  };

  //taking all films belonging a each section from the API
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

  //select movie from body
  const selectMovie = (selectedMovie) => {
    setMovie(selectedMovie);
  };

  const fetchTrailer = async (id) => {
    console.log(id);
    try {
      const response = await fetchTrailersCat(id);
      console.log(response.id);
      console.log(response);
      //check if movie state is the same as the server got
      if (movie.id === response.id) {
        const official = response.videos?.results;
        const officialTrailer = official.find(
          (vid) => vid.name === "Official Trailer"
        );
        console.log(official);
        console.log(officialTrailer);

        if (officialTrailer) {
          setTrailer(officialTrailer.key);
        } else {
          // Si no se encuentra el tráiler oficial, reproducir el primer tráiler
          const firstTrailer =
            official.length > 0 ? official[official.length - 1] : null;
          console.log(firstTrailer.key);
          if (firstTrailer) {
            console.log("Reproduciendo el primer tráiler:", firstTrailer);
            setTrailer(firstTrailer.key);
          } else {
            console.log("No se encontraron tráilers disponibles.");
            return null; // O cualquier valor por defecto que desees devolver
          }
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
    setTrailer(mov);
  };

  return (
    <>
      <div className="m-12">
        {/* taking from redux state the name of categories */}
        {categories &&
          categories.map((cat) => (
            <div key={cat.id} className="mb-8 ">
              <h1 className="text-5xl font-bold mb-4 ml-4">{cat.name}</h1>

              {/* from each section render movies list and framework carrousel*/}
              <Slider {...settings}>
                {sectionsByCategory[cat.id] &&
                  sectionsByCategory[cat.id].map((mov, secIndex) => (
                    <div
                      className="p-4 cursor-pointer"
                      key={secIndex}
                      onClick={() => handleModal(mov)}
                    >
                      <h1 className="font-roboto text-s p-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {mov.title}
                      </h1>
                      <img
                        src={`${URL_IMAGE + mov.backdrop_path}`}
                        alt={mov.title}
                        className="w-full h-auto"
                      />
                      <button
                        onClick={() => handleModal(mov)}
                        className=" hover:text-blue-500 p-2"
                      >
                        info +
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
