//Import
import express, {json} from 'express';
import morgan from 'morgan';
import { listQuestions } from './dao.mjs';

//Init
const app = express();
const port = 3001;

// Middleware
app.use(json());
app.use(morgan('dev')); //dev is the mode of logging, this one is useful for development

// Route
// GET /api/questions
app.get('/api/questions',(request, response) => {
  listQuestions()
  .then(questions => response.json(questions))
  .catch(() => response.status(500).end());
})

//Starting server
app.listen(port, () => 'API Server Started');