import {Form, Button} from "react-bootstrap";
import { useState } from 'react';

function FormAnswer() {
const [text, setText] = useState('');
const [email, setEmail] = useState('');
const [date, setDate] = useState('');

const handleSubmit = () => {
    // will do something
}

    return(
        <Form>
            <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control type="text" required={true} minLength={2} value={text} onChange={(event) => setText(event.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required={true} value={email} onChange={(event) => setEmail(event.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Add</Button>
            <Button variant="danger">Cancel</Button>
        </Form>
    );
}

export default FormAnswer;