import { fetchCategories } from "@/utils/services/fetchData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategories } from "@/redux/slice";

export default function Categories() {
  const categories = useSelector((state) => state.movies.categories);
  const dispatch = useDispatch();

  const fetchCat = async () => {
    const cat = await fetchCategories();
    dispatch(setAllCategories(cat));
  };

  useEffect(() => {
    fetchCat();
  }, []);
  return (
    <div className="border border-blue-500 p-4 ">
      {categories
        ? categories.map((cat, index) => (
            <div key={index} className="border border-yellow-500 p-2 h-[300px]">
              <h1>{cat.name}</h1>
            </div>
          ))
        : null}
    </div>
  );
}
