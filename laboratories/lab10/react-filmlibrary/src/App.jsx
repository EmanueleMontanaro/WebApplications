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
const filterInit = "All";

function App() {
  
  const [filter, setFilter] = useState(filterInit);
  
  const editFilter = (filter) => {
    setFilter(filter);
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
        <Route path='/' element={<Films filter='All' mode='view'/>}/>
        <Route path='/favorites' element={<Films filter='favorites' mode='view'/>}/>
        <Route path='/bestrated' element={<Films filter='bestrated' mode='view'/>}/>
        <Route path='/seenlastmonth' element={<Films filter='seenlastmonth' mode='view'/>}/>
        <Route path='/unseen' element={<Films filter='unseen' mode='view'/>} />
        <Route path='/add' element={<Films filter={filter} mode='add'/>}/>
        <Route path='/edit/:id' element={<Films filter={filter} mode='edit'/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>

        
    </Routes>
     
  )
}

export default App
