import dayjs from 'dayjs';
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {Link, useParams, useNavigate} from 'react-router-dom';

function FilmsForm(props){
    const navigate = useNavigate();
    let film = undefined;
    if(props.mode === 'edit'){
      const params = useParams();
      film = props.films.find(movie=>movie.id==parseInt(params.id));
    }
    const [title, setTitle] = useState(film ? film.title : '');
    const [favorites, setFavorites] = useState(film ? film.favorites : 0);
    const [date, setDate] = useState(film ? dayjs(film.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
    const [rating, setRating] = useState(film ? film.rating : 0);
    const [error,setError] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const validationErrors = validateForm();
        const movie = {title, favorites, date, rating};
        if(Object.keys(validationErrors).length === 0){
            if(props.mode === 'edit'){
                props.updateMovie({id: film.id, ...movie});
                navigate('../..', {relative: "path"});
               } else {
                  props.addMovie(movie);
                  navigate('..', {relative: "path"});
               }
        } else {
            setError(validationErrors);
        }
         
      }
      
    const validateForm = () => {
        let error = {};
        if (title.includes(' ')){
            error.title = 'Title must not contain blank spaces!';
        }
        if (dayjs(date).isAfter(dayjs())){
            error.date = 'Date must not be in the future!';
        }
        if(!dayjs(date).isValid() && favorites==1){
            error.date = 'You cannot put a movie as favorite if you have not watched it yet!'
        }

        if(!dayjs(date).isValid() && rating!==0){
            error.date = 'You cannot set a rating to a movie if you have not watched it yet!'
        }
        return error;
    }
    return(
            <Form onSubmit={handleSubmit}>
                <Row className="text-light text-center">
                    <Col style={{backgroundColor: '#101935'}} className="text-light text-center" >
                        <Form.Group controlId='title'>
                            <Form.Control placeholder='Title' type='text' required={true} value={title} onChange={(event) => setTitle(event.target.value)} isInvalid={error.title}></Form.Control>
                            <Form.Control.Feedback type="invalid">{error.title}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col style={{backgroundColor: '#101935'}} className="text-light text-center" >
                        <Form.Group>
                            <Form.Check as={FavoriteCheckboxNew} type='checkbox' favorites={favorites} setFavorites={setFavorites}/>
                        </Form.Group>
                    </Col>
                    <Col style={{backgroundColor: '#101935'}} className="text-light text-center" >
                    <Form.Group controlId='date'>
                        <Form.Control type='date' required={false} value={date} onChange={(event) => setDate(event.target.value)} isInvalid={error.date}></Form.Control>
                        <Form.Control.Feedback type="invalid">{error.date}</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    <Col>
                        <Form.Check as={FilmRatingNew} type='radio' setRating={setRating} rating={rating}/>
                    </Col>
                    <Col>
                        {props.mode==='add' && <Button className='btn-success mx-1' type='submit'><i className='bi bi-check'></i></Button>}
                        {props.mode==='edit' && <Button className='btn btn-primary mx-1' type='submit'><i className='bi bi-pencil-square'></i></Button>}
                        <Link className='btn btn-danger' onClick={props.cancel} to='..' relative='path'><i className='bi bi-x'></i></Link>
                    </Col>
                </Row>
            </Form>  
    );
}

function FavoriteCheckboxNew (props) {
    return(
        <>
            <label className="ui-bookmark">
            <input type="checkbox" checked={props.favorites} onChange={()=>props.setFavorites(!props.favorites)}/>
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

function FilmRatingNew (props) {
    return(
        <div className="rating">
  <input type="radio" id={`star5`} name={`rate`} value="5" onChange={() => props.setRating(5)} checked={props.rating===5} onClick={() => props.setRating(0)}/>
  <label title="Excellent!" htmlFor={`star5`} >
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="4" name={`rate`} id={`star4`} type="radio" onChange={() => props.setRating(4)} checked={props.rating===4} onClick={() => props.setRating(0)}/>
  <label title="Great!" htmlFor={`star4`}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="3" name={`rate`} id={`star3`} type="radio" onChange={() => props.setRating(3)} checked={props.rating===3} onClick={() => props.setRating(0)}/>
  <label title="Good" htmlFor={`star3`} >
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="2" name={`rate`} id={`star2`} type="radio" onChange={() => props.setRating(2)} checked={props.rating===2} onClick={() => props.setRating(0)}/>
  <label title="Okay" htmlFor={`star2`} >
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="1" name={`rate`} id={`star1`} type="radio" onChange={() => props.setRating(1)} checked={props.rating===1} onClick={() => props.setRating(0)}/>
  <label title="Bad" htmlFor={`star1`} >
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
</div>

    );
}


export default FilmsForm;