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

module.exports = { fetchData, fetchCategories };
