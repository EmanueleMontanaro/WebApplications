// import
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import {check, validationResult} from 'express-validator';
import { getCorrectAnswers, getSingleGame, getFullGame, postMatch, getHistory } from './memes-dao.mjs';
import { getUser } from './user-dao.mjs';

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


app.get('/api/meme', (request, response) => {
    getSingleGame()
    .then((meme) =>  response.json(meme))
    .catch(() => {
      response.status(500).end()});
})

app.get('/api/memes', isLoggedIn, [

], (request, response) => {
  const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
  getFullGame()
  .then((meme) =>  response.json(meme))
  .catch(() => {
    response.status(500).end()});
})

app.get('/api/meme/:id', (request, response) => {
    getCorrectAnswers(request.params.id)
    .then((id) => response.json(id))
    .catch(() => {
      response.status(500).end()});
})

app.post('/api/history', isLoggedIn, [
  check('userId').isInt().notEmpty().withMessage('Wrong userId parameter'),
  check('date').isDate({format: 'YYYY-MM-DD'}).notEmpty().withMessage('Wrong date parameter'),
  check('hour').isString().notEmpty().withMessage('Wrong hour parameter'),
  check('src1').isString().notEmpty().withMessage('Wrong src1 parameter'),
  check('text1').isString().notEmpty().withMessage('Wrong text1 parameter'),
  check('value1').isBoolean().notEmpty().withMessage('Wrong value1 parameter'),
  check('src2').isString().notEmpty().withMessage('Wrong src2 parameter'),
  check('text2').isString().notEmpty().withMessage('Wrong text2 parameter'),
  check('value2').isBoolean().notEmpty().withMessage('Wrong value2 parameter'),
  check('src3').isString().notEmpty().withMessage('Wrong src3 parameter'),
  check('text3').isString().notEmpty().withMessage('Wrong text3 parameter'),
  check('value3').isBoolean().notEmpty().withMessage('Wrong value3 parameter'),
  check('score').isInt().notEmpty().withMessage('Wrong score parameter')
], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({errors: errors.array()});
  }

  const newMatch = request.body;

  try {
    const id = await postMatch(newMatch);
    response.status(201).location(id).end();
  } catch(err) {
    console.error(`ERROR: ${err.message}`);
    response.status(503).json({error: 'Impossible to register new round'});
  }
})

app.get('/api/history/:id', isLoggedIn, (request, response) => {
  if(request.user.id != request.params.id) return response.status(401).json({error: 'Not authorized'});
  getHistory(request.params.id)
  .then((id) => response.json(id))
  .catch((err) => {
    response.status(500).end()
  });
})

app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        return res.status(401).send(info);
      }
      req.login(user, (err) => {
        if (err)
          return next(err);
        return res.status(201).json(req.user);
      });
  })(req, res, next);
});

app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });