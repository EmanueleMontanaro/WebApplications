import 'bootstrap/dist/css/bootstrap.min.css';
import NavHeader from './components/NavHeader.jsx'
import { Helmet } from 'react-helmet';
import SidebarFilters from './components/Sidebar.jsx';
import {Button} from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import Films from './components/FilmsComponents.jsx';
import {FilmLibrary, Movie} from './FilmModels.js';
import { useState } from 'react';

const library = new FilmLibrary();
library.init();
const filmsInit = library.getMovies();
const filterInit = 'All';

function App() {
  const [films, setFilms] = useState(filmsInit);
  const [filter, setFilter] = useState(filterInit);
  const [editableMovie, setEditableMovie] = useState();
  
  const filterFilms = (filterType) => {
    setFilter(filterType);
  }

  const [mode, setMode] = useState('view');

  const handleEdit = (movie) => {
    setEditableMovie(movie);
    setMode('edit');
  }

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

  return (
    <Router>
      <Helmet>
                <style>{'body { background-color: #101935; }'}</style>
      </Helmet>
     <NavHeader/>
     <div className="container-fluid row">
     <div className="col-sm-3">
      <SidebarFilters filterFilms={filterFilms}/>
      </div>
      <div className="col-sm-9 text-start mt-5">
      <Films filter={filter} films={films} mode={mode} handleEdit={handleEdit} editableMovie={editableMovie} addMovie={addMovie} updateMovie={updateMovie} setMode={setMode}></Films> 
      </div>
     </div>
     {mode==='view' && <Button className='floating-button rounded-circle' onClick={()=>setMode('add')}>
     <i className="bi bi-plus"/>
      </Button>}
    </Router>
  )
}

export default App
