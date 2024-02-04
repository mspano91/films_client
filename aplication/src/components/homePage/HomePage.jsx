"use client";
import React from "react";
import Categories from "./categories/Categories";
import Movies from "./movies/Movies";

const HomePage = () => {
  return (
    <>
      <Movies />
      <Categories />
    </>
  );
};

export default HomePage;
