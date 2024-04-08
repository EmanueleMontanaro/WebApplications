// Imports
import express, {json, response} from 'express';
import morgan from 'morgan';
import {check, validationResult} from 'express-validator';
import { library, favorites, bestRated, unseen, watchedLastMonth, getMovie, addMovie, updateMovie, updateRating, updateFavorites, deleteMovie } from './dao.mjs';

// Init
const app = express();
const port = 3001;

// Middleware
app.use(json());
app.use(morgan('dev'));

/* ROUTE */

// Get all movies
app.get('/api/library/movies', (request, response) => {
  if(request.query.filter === 'favorites') {
    console.log("favorites");
    favorites()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
  } else if (request.query.filter === 'maxR'){
    bestRated()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
  } else if (request.query.filter === 'unseen'){
    unseen()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
  } else if (request.query.filter === 'lastMonth'){
    watchedLastMonth()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
  } else {
    console.log("library");
    library()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
  }
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
  check('rating').isIn([0,1,2,3,4,5]).withMessage("Rating field bust be an integer from 0 to 5"),
  check('date').optional().isDate({format: 'YYYY-MM-DD', strictMode: true}).withMessage("Date field must be in 'YYYY-MM-DD' format or NULL"),
  check('userid').isInt()
], async (request, response) => {
  const errors = validationResult(request);
  if(!errors.isEmpty()) {
    return response.status(422).json({errors: errors.array()});
  }
  const { title, favorites, rating, date, userid } = request.body;
  try {
    const id = await addMovie(title,favorites,rating,date,userid);
    response.status(201).location(id).end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    response.status(503).json({error: 'Error while creating new movie.'});
  }
}); 

app.put('/api/library/movies/:id', [
  check('id').isInt(),
  check('title').notEmpty().withMessage("Title can't be empty"),
  check('favorites').isIn([0,1]).withMessage("Favorites field must be 0 or 1"),
  check('rating').isIn([0,1,2,3,4,5]).withMessage("Rating field bust be an integer from 0 to 5"),
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
    const id = await addMovie(movieId, title,favorites,rating,date,userid);
    response.status(200).location(id).end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    response.status(503).json({error: 'Error while updating movie.'});
  }
});

app.listen(port, () => { console.log(`API Server Started at http://localhost:${port}`); });