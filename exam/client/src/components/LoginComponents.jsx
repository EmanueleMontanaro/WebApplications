import { useNavigate, Link } from "react-router-dom";
import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTheme } from "./themeContext";

function Login(props) { 
    const navigate = useNavigate();

    const {theme} = useTheme();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(props.login) {
            navigate('/home');
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const credentials = { username, password };
        
        props.handleLogin(credentials);
    };

    return(
        <Container className={`centered-container background-container-${theme}`}>
            {props.message && <Row>
                <Alert variant={props.message.type} onClose={() => props.setMessage('')} dismissible>{props.message.msg}</Alert>
            </Row> }
            {theme==='light' && <p className="h2" style={{color: '#2B2D42'}}>Login</p>}
            {theme==='dark' && <p className="h2" style={{color: '#EDF2F4'}}>Login</p>}
            <Container className={`rectangular-container-${theme} text-center`}>
                <Form onSubmit={handleSubmit}>
                <Form.Group controlId='username' className="mt-3">
                    <Form.Control placeholder='Email' type='email' required={true} value={username} onChange={(ev) => setUsername(ev.target.value)} style={{border: '2px solid #101119'}}/>
                </Form.Group>
                <Form.Group controlId='password' className="mt-3">
                    <Form.Control placeholder='Password' type='password' required={true} value={password} onChange={(ev) => setPassword(ev.target.value)} style={{border: '2px solid #101119'}}/>
                </Form.Group>
                <Row>
                    <Col className="mt-3 justify-content">
                        <Button className={`button-${theme} mx-1 text-${theme} button-hover`} variant={`${theme==='light' ? 'dark' : 'light'}`} type='submit'>Login</Button>
                        <Button className='btn button-red button-hover text-light mx-1' variant='danger' onClick={()=>navigate('/')}>Cancel</Button>
                    </Col>
                </Row>
                <p className="h5 text-light mt-3">Don't have an account?</p>
                <Button className={`btn mt-1 button-hover text-dark`} variant="warning" onClick={()=>navigate('/home')}>Play as a Guest</Button>
            </Form>
            </Container>
        </Container>
    );
}

export default Login;