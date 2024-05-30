import { Movie } from "./FilmModels";

const SERVER_URL ='http://localhost:3001'

const getMovies = async (filter) => {
  console.log("Get movies")
  if(filter=='All'){
    return await getAllMovies();
  } else {
    return await getFilteredMovies(filter);
  }
}

const getAllMovies = async() => {
  const response = await fetch(`${SERVER_URL}/api/library/movies`);
  if(response.ok) {
    const moviesJson = await response.json();
    return moviesJson.map(movie => new Movie(movie.id, movie.title, movie.userid, movie.favorites, movie.rating, movie.date));
  } else {
    throw new Error('Internal Server Error'); //Since it would be a 500
  }
}

const getFilteredMovies = async(filter) => {
    const response = await fetch(`${SERVER_URL}/api/library/movies?filter=${filter}`);
    if(response.ok) {
      const moviesJson = await response.json();
      return moviesJson.map(movie => new Movie(movie.id, movie.title, movie.userid, movie.favorites, movie.rating, movie.date));
    } else {
      throw new Error('Internal Server Error'); //Since it would be a 500
    }
}

const API = {getMovies, getAllMovies, getFilteredMovies};

export default API;