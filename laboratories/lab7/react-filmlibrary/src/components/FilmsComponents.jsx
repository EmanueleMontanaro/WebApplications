import { Row, Col, Table, Button } from 'react-bootstrap';
import React from 'react';
import dayjs from 'dayjs';
import './custom.css';
import { useState } from 'react';
import FilmsForm from './FilmsForm.jsx';

function Films (props) {
  let filteredMovies;

  console.log(props.filter);
  if(props.filter==="All"){
    filteredMovies = [...props.films];
  } else if(props.filter==="Favorites"){
    filteredMovies = [...props.films].filter(movie=>movie.favorites==1);
  } else if(props.filter==="Best rated"){
    filteredMovies = [...props.films].filter(movie=>movie.rating==5);
  } else if(props.filter==="Seen last month"){
    filteredMovies = [...props.films].filter(movie => dayjs(movie.date).isAfter(dayjs().subtract(30,'d')) && dayjs(movie.date).isValid());
  } else if(props.filter==="Unseen"){
    filteredMovies = [...props.films].filter(movie => !dayjs(movie.date).isValid());
  }

  console.log(filteredMovies);
    return(
        <>
            <Row>
                <Col as='h1' className="text-light text-start">{props.filter}</Col>
            </Row>
            <Row>
            <Col lg={10} className="mx-auto">
            <FilmsTable films={filteredMovies} handleEdit={props.handleEdit} updateMovie={props.updateMovie}></FilmsTable>
            {props.mode==='add' && <FilmsForm addMovie={(movie) => {props.addMovie(movie); props.setMode('view')}} cancel={() => props.setMode('view')} mode={props.mode}/>}
            {props.mode === 'edit' && <FilmsForm key={props.editableMovie.id} film={props.editableMovie} updateMovie={(movie) => {props.updateMovie(movie); props.setMode('view')}} cancel={() => props.setMode('view')} mode={props.mode}/>}
            </Col>
            </Row>
      </>
    );
}

function FilmsTable (props) {
    const tableStyle = {
        color: '#1C2D5E',
    }
    return (
        <Table hover >
            <tbody>
                { props.films.map((movie) => <FilmRow film={movie} key={movie.id} handleEdit={props.handleEdit} updateMovie={props.updateMovie}/>)}
            </tbody>
        </Table>
    );
}

function FilmRow (props) {
    return(
        <tr style={{marginTop: '4px'}}><FilmData film={props.film} handleEdit={props.handleEdit} updateMovie={props.updateMovie}/></tr>
      );
}

function FilmData (props) {
    let formattedDate;
    if (dayjs(props.film.date).isValid()){
        formattedDate=dayjs(props.film.date).format("MMMM DD, YYYY");
    } else {
        formattedDate=""
    }
    return(
    <>
      <td style={{backgroundColor: '#101935'}} className="text-light text-center" >{props.film.title}</td>
      <td style={{backgroundColor: '#101935'}} className="text-light text-center"><FavoriteCheckbox film={props.film} updateMovie={props.updateMovie}/></td>
      <td style={{backgroundColor: '#101935'}} className="text-light text-center">{formattedDate}</td>
      <td style={{backgroundColor: '#101935'}} className="text-light text-center"><FilmRating film={props.film} updateMovie={props.updateMovie}/></td>
      <FilmAction handleEdit={props.handleEdit} film={props.film}/>
    </>
    );
}

function FavoriteCheckbox (props) {
    return(
        <>
            <label className="ui-bookmark">
            <input type="checkbox" checked={props.film.favorites} onChange={() => {if(dayjs(props.film.date).isValid())props.updateMovie({ ...props.film, favorites: !props.film.favorites})}}/>
            <div className="bookmark">
            <svg viewBox="0 0 16 16" style={{marginTop: "4px"}} className="bi bi-heart-fill"
                height="25"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                fillRule="evenodd"
                ></path>
            </svg>
            </div>
        </label>
      </>
    );
}

function FilmRating (props) {
    return(
        <div className="rating">
  <input type="radio" id={`star5-${props.film.id}`} name={`rate-${props.film.id}`} value="5" checked={props.film.rating==5} onChange={() => {if(dayjs(props.film.date).isValid())props.updateMovie({ ...props.film, rating: 5})}} onClick={() => {if(dayjs(props.film.date).isValid())props.updateMovie({ ...props.film, rating: 0})}}/>
  <label title="Excellent!" htmlFor={`star5-${props.film.id}`}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="4" name={`rate-${props.film.id}`} id={`star4-${props.film.id}`} type="radio" checked={props.film.rating==4} onChange={() => {if(dayjs(props.film.date).isValid())props.updateMovie({ ...props.film, rating: 4})}} onClick={() => {if(dayjs(props.film.date).isValid())props.updateMovie({ ...props.film, rating: 0})}}/>
  <label title="Great!" htmlFor={`star4-${props.film.id}`}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="3" name={`rate-${props.film.id}`} id={`star3-${props.film.id}`} type="radio" checked={props.film.rating==3} onChange={() => {if(dayjs(props.film.date).isValid())props.updateMovie({ ...props.film, rating: 3})}} onClick={() => {if(dayjs(props.film.date).isValid())props.updateMovie({ ...props.film, rating: 0})}}/>
  <label title="Good" htmlFor={`star3-${props.film.id}`}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="2" name={`rate-${props.film.id}`} id={`star2-${props.film.id}`} type="radio" checked={props.film.rating==2} onChange={() => {if(dayjs(props.film.date).isValid())props.updateMovie({ ...props.film, rating: 2})}} onClick={() => {if(dayjs(props.film.date).isValid())props.updateMovie({ ...props.film, rating: 0})}}/>
  <label title="Okay" htmlFor={`star2-${props.film.id}`}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="1" name={`rate-${props.film.id}`} id={`star1-${props.film.id}`} type="radio" checked={props.film.rating==1} onChange={() => {if(dayjs(props.film.date).isValid()) props.updateMovie({ ...props.film, rating: 1})}} onClick={() => {if(dayjs(props.film.date).isValid())props.updateMovie({ ...props.film, rating: 0})}}/>
  <label title="Bad" htmlFor={`star1-${props.film.id}`}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
</div>

    );
}

function FilmAction (props) {
    return(
    <td style={{backgroundColor: '#101935'}} className="text-light text-center"> 
      <Button variant='warning' className='mx-1' onClick={()=>props.handleEdit(props.film)}><i className='bi bi-pencil-square'></i></Button> 
      <Button variant='warning'><i className='bi bi-trash'></i></Button>
    </td>
    );
}

export default Films;