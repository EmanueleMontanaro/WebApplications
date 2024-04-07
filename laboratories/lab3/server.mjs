// Imports
import express, {json} from 'express';
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
    library()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
})

app.get('/api/library/movies/?filter=favorites', (request, response) => {
    favorites()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
})

app.get('/api/library/movies/?filter=bestRated', (request, response) => {
    bestRated()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
})

app.get('/api/library/movies/?filter=unseen', (request, response) => {
    unseen()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
})

app.get('/api/library/movies/?filter=lastMonth', (request, response) => {
    watchedLastMonth()
    .then(movies => response.json(movies))
    .catch(() => response.status(500).end());
})

app.get('/api/library/movies/:id', async(req, res) => {
    try {
      const movie = await getMovie(req.params.id);
      if(movie.error)
        res.status(404).json(movie);
      else
        res.json(movie);
    } catch {
      res.status(500).end();
    }
  });

app.listen(port, () => 'API Server Started');