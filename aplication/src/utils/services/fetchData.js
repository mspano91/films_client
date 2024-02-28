const axios = require("axios");

const fetchData = async () => {
  try {
    const response = await axios.get(`http://localhost:3002/movies`);
    const movies = response.data;
    console.log(movies);
    return movies;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchSearch = async (searchKey) => {
  console.log(searchKey);
  try {
    const response = await axios.get(
      `http://localhost:3002/movies/${searchKey}`
    );
    const movies = response.data;
    console.log(movies);
    return movies;
  } catch (error) {
    alert("not founded");
  }
};

const fetchById = async (id) => {
  console.log(id);
  try {
    const response = await axios.get(`http://localhost:3002/sections/${id}`);
    const section = response.data;
    console.log(section);
    return section;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`http://localhost:3002/cat`);
    const cate = response.data;
    console.log(cate);
    return cate;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchTrailers = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3002/trailer/${id}`);
    const trailer = response.data;
    // console.log(response);
    return trailer;
  } catch (error) {
    throw new Error(error.message);
  }
};
const fetchTrailersCat = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3002/trailerByCat/${id}`
    );
    const trailer = response.data;
    console.log(response);
    return trailer;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  fetchTrailersCat,
  fetchData,
  fetchCategories,
  fetchTrailers,
  fetchById,
  fetchSearch,
};
