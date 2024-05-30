import 'bootstrap/dist/css/bootstrap.min.css';
import NavHeader from './components/NavHeader.jsx'
import SidebarFilters from './components/Sidebar.jsx';
import {Container} from 'react-bootstrap';
import { Outlet, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Films from './components/FilmsComponents.jsx';
import {FilmLibrary, Movie} from './FilmModels.js';
import { useEffect, useState } from 'react';
import './components/custom.css';
import NotFound from './components/NotFoundComponent.jsx';
import FilmsForm from './components/FilmsForm.jsx';
import API from './API.mjs';

const library = new FilmLibrary();
const filterInit = 'All';

function App() {
  const [films, setFilms] = useState([]);
  const [mode, setMode] = useState('view');
  const [filter, setFilter] = useState(filterInit);

  const editFilter = (filter) => {
    setFilter(filter);
  }

  useEffect(() => {
    const getMovies = async() => {
      const movies = await API.getMovies(filter);
      setFilms(movies);
    }
    getMovies();
  }, [filter]);

  const addMovie = (film) => {
    const newId = Math.max(...films.map(movie => movie.id)) + 1;
    const newMovie = new Movie(newId,film.title,1,film.favorites,film.rating,film.date);
    library.addMovie(newMovie);
    setFilms(library.getMovies());
  }

  const updateMovie = (film) => {
    library.editMovie(film);
    setFilms(library.getMovies());
  }

  const deleteMovie = (id) => {
    library.delete(id);
    setFilms(library.getMovies());
  }

  return (
    <Routes>
      <Route element={<>
            <NavHeader/>
          <Container className='container-fluid row fit-all'>
            <div className="col-sm-3">
              <SidebarFilters editFilter={editFilter}/>
            </div>
            <div className="col-sm-9 text-start mt-5">
              <Outlet/>
            </div>
          </Container>
        </>
      }>
        <Route path='/' element={<Films filter={'All'} films={films} deleteMovie={deleteMovie} updateMovie={updateMovie}/>}/>
        <Route path='/favorites' element={<Films filter={'Favorites'} films={films} deleteMovie={deleteMovie} updateMovie={updateMovie}/>}/>
        <Route path='/bestrated' element={<Films filter={'Best rated'} films={films} deleteMovie={deleteMovie} updateMovie={updateMovie}/>}/>
        <Route path='/seenlastmonth' element={<Films filter={'Seen last month'} films={films} deleteMovie={deleteMovie} updateMovie={updateMovie}/>}/>
        <Route path='/unseen' element={<Films filter={'Unseen'} films={films} mode={mode} deleteMovie={deleteMovie} updateMovie={updateMovie}/>} />
        <Route path='/add' element={<FilmsForm addMovie={(movie) => {addMovie(movie); setMode('view')}} cancel={() => setMode('view')} mode={'add'}/>}/>
        <Route path='/edit/:id' element={<FilmsForm films={films} updateMovie={(movie) => {updateMovie(movie); setMode('view')}} cancel={() => setMode('view')} mode={'edit'}/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>

        
    </Routes>
     
  )
}

export default App
