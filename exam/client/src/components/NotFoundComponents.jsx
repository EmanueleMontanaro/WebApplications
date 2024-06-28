import { Button, Container } from 'react-bootstrap';
import './custom.css';
import { useTheme } from './themeContext';
import { useNavigate } from 'react-router-dom';

function NotFound(){
    const navigate = useNavigate();

    const {theme} = useTheme();

    return(
        <Container className={`background-container-${theme} text-center`}>
            <h1 className={`text-opposite-${theme}`}>404</h1>
            <h2 className={`text-opposite-${theme}`}>The requested page has not been found!</h2>
            <Button className={`btn button-${theme} button-hover text-${theme} mt-3`} variant={`${theme==='light' ? 'dark' : 'light'}`} style={{fontSize: '24px'}} onClick={()=>navigate('/home')}> <i className="bi bi-house-fill"/> Main menu</Button>
        </Container>
    );
}

export default NotFound;