import { Movie } from "./FilmModels";

const SERVER_URL ='http://localhost:3001'

const getMovies = async (filter) => {
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
    const response = await fetch(`${SERVER_URL}/api/library/${filter}`);
    if(response.ok) {
      const moviesJson = await response.json();
      return moviesJson.map(movie => new Movie(movie.id, movie.title, movie.userid, movie.favorites, movie.rating, movie.date));
    } else {
      throw new Error('Internal Server Error'); //Since it would be a 500
    }
}

const addMovie = async(movie) => {
  const response = await fetch(`${SERVER_URL}/api/library/movies`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: movie.title, favorites: movie.favorites, rating: movie.rating, date: movie.date, userid: 1})
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  } else return null;
}

const updateMovie = async(movie,id) => {
  const response = await fetch(`${SERVER_URL}/api/library/movies/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: movie.title, favorites: movie.favorites, rating: movie.rating, date: movie.date, userid: 1})
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  } else return null;
}

const deleteMovie = async(id) => {
  const response = await fetch(`${SERVER_URL}/api/library/movies/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  });
}

const API = {getMovies, getAllMovies, getFilteredMovies, addMovie, updateMovie, deleteMovie};

export default API;