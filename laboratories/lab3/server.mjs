// Imports
import express, {json} from 'express';
import morgan from 'morgan';
import {check, validationResult} from 'express-validator';
import { library, favorites, bestRated, unseen, watchedLastMonth, movie, addMovie, updateMovie, updateRating, updateFavorites, deleteMovie } from './dao.mjs';

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

app.listen(port, () => 'API Server Started');