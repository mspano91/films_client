import { fetchCategories, fetchById } from "@/utils/services/fetchData";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategories } from "@/redux/slice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const URL_IMAGE = "https://image.tmdb.org/t/p/original";

export default function Categories() {
  const categories = useSelector((state) => state.movies.categories);
  const dispatch = useDispatch();
  const [sectionsByCategory, setSectionsByCategory] = useState({});

  const fetchCat = async () => {
    const cat = await fetchCategories();
    dispatch(setAllCategories(cat));
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

  useEffect(() => {
    fetchCat();
  }, []);

  useEffect(() => {
    if (categories) {
      categories.forEach((cat) => {
        fetchSections(cat.id);
      });
    }
  }, [categories]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  }; //carrousel confi

  return (
    <div className="border border-blue-500 m-12">
      {categories &&
        categories.map((cat) => (
          <div key={cat.id} className="mb-8 ">
            <h1 className="text-3xl font-bold mb-4 m-12">{cat.name}</h1>

            <Slider {...settings}>
              {sectionsByCategory[cat.id] &&
                sectionsByCategory[cat.id].map((sec, secIndex) => (
                  <div className="p-4" key={secIndex}>
                    <img
                      src={`${URL_IMAGE + sec.backdrop_path}`}
                      alt={sec.title}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        ))}
    </div>
  );
}
