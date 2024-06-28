// Imports
import express, {json, response} from 'express';
import morgan from 'morgan';
import {check, validationResult} from 'express-validator';
import cors from 'cors';
import { library, favorites, bestRated, unseen, watchedLastMonth, getMovie, addMovie, updateMovie, updateRating, updateFavorites, deleteMovie } from './dao.mjs';

// Init
const app = express();
const port = 3001;

// Middleware
app.use(json());
app.use(morgan('dev'));

const corsOptions = {
  origin: 'http://localhost:5173', //Works only for this origin
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

/* ROUTE */

// Get all movies
app.get('/api/library/:filter', (request, response) => {
  //setTimeout(() => {
    if(request.params.filter === 'favorites') {
    favorites()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
  } else if (request.params.filter === 'bestrated'){
    bestRated()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
  } else if (request.params.filter === 'unseen'){
    unseen()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
  } else if (request.params.filter === 'seenlastmonth'){
    watchedLastMonth()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
  } else {
    library()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
  }
  // }}, 1000);
})

app.get('/api/library/movies/:id', async(request, response) => {
    try {
      const movie = await getMovie(request.params.id);
      if(movie.error)
      response.status(404).json(movie);
      else
      response.json(movie);
    } catch {
      response.status(500).end();
    }
});

app.post('/api/library/movies', [
  check('title').notEmpty().withMessage("Title can't be empty"),
  check('favorites').isIn([0,1]).withMessage("Favorites field must be 0 or 1"),
  check('rating').isIn([null,1,2,3,4,5]).withMessage("Rating field bust be an integer from 1 to 5, eventually null"),
  check('date').optional({nullable: true}).isDate({format: 'YYYY-MM-DD', strictMode: true}).withMessage("Date field must be in 'YYYY-MM-DD' format or NULL"),
  check('userid').isInt()
], async (request, response) => {
  const errors = validationResult(request);
  if(!errors.isEmpty()) {
    return response.status(422).json({errors: errors.array()});
  }
  const { title, favorites, rating, date, userid } = request.body;
  try {
    const id = await addMovie(title,favorites,rating,date,userid);
    response.status(201).json(id).end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    response.status(503).json({error: 'Error while creating new movie.'});
  }
}); 

app.put('/api/library/movies/:id', [
  check('id').isInt(),
  check('title').notEmpty().withMessage("Title can't be empty"),
  check('favorites').isIn([0,1]).withMessage("Favorites field must be 0 or 1"),
  check('rating').isIn([null,1,2,3,4,5]).withMessage("Rating field bust be an integer from 1 to 5, eventually null"),
  check('date').optional().isDate({format: 'YYYY-MM-DD', strictMode: true}).withMessage("Date field must be in 'YYYY-MM-DD' format or NULL"),
  check('userid').isInt()
], async(request, response) => {
  const errors = validationResult(request);
  if(!errors.isEmpty()) {
    return response.status(422).json({errors: errors.array()});
  }
  const movieId = request.params.id;
  const { title, favorites, rating, date, userid } = request.body;
  try {
    const id = await updateMovie(movieId, title,favorites,rating,date,userid);
    if(id.error)
      response.status(404).json(id);
    else response.status(200).json(id).end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    response.status(503).json({error: 'Error while updating movie.'});
  }
});

app.put('/api/library/movies/:id/rating', [
  check('id').isInt(),
  check('rating').isIn([0,1,2,3,4,5]).withMessage("Rating field bust be an integer from 0 to 5")
], async(request, response) => {
  const errors = validationResult(request);
  if(!errors.isEmpty()) {
    return response.status(422).json({errors: errors.array()});
  }
  const movieId = request.params.id;
  const {rating} = request.body;
  try {
    const id = await updateRating(movieId,rating);
    if(id.error)
      response.status(404).json(id);
    else response.status(200).json(id).end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    response.status(503).json({error: 'Error while updating movie.'});
  }
});

app.put('/api/library/movies/:id/favorites', [
  check('id').isInt(),
  check('favorites').isIn([0,1]).withMessage("Favorites field must be 0 or 1")
], async(request, response) => {
  const errors = validationResult(request);
  if(!errors.isEmpty()) {
    return response.status(422).json({errors: errors.array()});
  }
  const movieId = request.params.id;
  const {favorites} = request.body;
  try {
    const id = await updateFavorites(movieId,favorites);
    if(id.error)
      response.status(404).json(id);
    else response.status(200).json(id).end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    response.status(503).json({error: 'Error while updating movie.'});
  }
});

app.delete('/api/library/movies/:id', async(request,response) => {
  try {
    const message = await deleteMovie(request.params.id);
    if(message.error)
    response.status(404).json(message);
    else
    response.json(message);
  } catch {
    response.status(500).end();
  }
})

app.listen(port, () => { console.log(`API Server Started at http://localhost:${port}`); });