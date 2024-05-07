import dayjs from 'dayjs';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function AnswerForm(props) {
  const [text, setText] = useState(props.answer ? props.answer.text : '');
  const [email, setEmail] = useState(props.answer ? props.answer.email : '');
  const [date, setDate] = useState(props.answer ? props.answer.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));

  const handleSubmit = (event) => {
    event.preventDefault(); //importante perchè il form chiamerebbe un altro indirizzo (quello della pagina e quindi il refresh della pagina)
    // creare una nuova risposta
    const answer = {text, email, date};

    // TODO: aggiungere validazione 
     if(props.mode === 'edit'){
      // aggiungere la risposta in questione
      props.updateAnswer({id: props.answer.id, ...answer});
     } else {
        // aggiungere la risposta allo stato
        props.addAnswer(answer);
     }
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Text</Form.Label>
        <Form.Control type="text" required={true} minLength={2} value={text} onChange={(event) => setText(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>email</Form.Label>
        <Form.Control type="email" required={true} value={email} onChange={(event) => setEmail(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)}></Form.Control>
      </Form.Group>
      {props.mode==='add' && <Button variant='success' type='Submit'>Add</Button>} 
      {props.mode==='edit' && <Button variant='primary' type='Submit'>Update</Button>} {' '}
      <Button variant='danger' onClick={props.cancel}>Cancel</Button>
    </Form>
  );
}

export default AnswerForm;