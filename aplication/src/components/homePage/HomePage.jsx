"use client";
import React from "react";
import Categories from "./categories/Categories";
import Movies from "./movies/Movies";

const HomePage = () => {
  return (
    <>
      <div>
        <Movies />
        <Categories />
      </div>
    </>
  );
};

export default HomePage;
