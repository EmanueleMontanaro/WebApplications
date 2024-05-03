import 'bootstrap/dist/css/bootstrap.min.css';
import NavHeader from './components/NavHeader'
import { Helmet } from 'react-helmet';
import SidebarFilters from './components/Sidebar';
import {Container} from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import Films from './components/FilmsComponents.jsx';
import {FilmLibrary} from './FilmModels.js';
import { useState } from 'react';

const library = new FilmLibrary();
library.init();
const filmsInit = library.getMovies();
const filterInit = "All";

function App() {
  const [films, setFilms] = useState(filmsInit);
  const [filter, setFilter] = useState(filterInit);
  
  const filterFilms = (filterType) => {
    setFilms(library.filteredFilms(filterType));
    setFilter(filterType);
  }

  console.log(films);

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
      <Films filter={filter} films={films}></Films> 
      </div>
     </div>
    </Router>
  )
}

export default App
