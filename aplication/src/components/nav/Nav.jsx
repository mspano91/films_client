"use client";
import { fetchCategories } from "@/utils/services/fetchData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategories } from "@/redux/slice";

export default function Nav() {
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
    <div className="border border-blue-500 p-4 flex ">
      <ul className="border border-red-500 flex gap-2 p-4 flex flex-col">
        {categories
          ? categories.map((cat, index) => (
              <li key={index} className="border border-yellow-500 p-2">
                <h1>{cat.name}</h1>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
