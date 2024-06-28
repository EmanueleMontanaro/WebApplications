import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { useTheme } from './themeContext';

function TitleScreen(props) {
const navigate = useNavigate();

    const {theme} = useTheme();

    return(
        <>
        <Container className={`centered-container background-container-${theme}`}>
            <AppTitle/>
            {props.login && <p className={`h2 text-opposite-${theme}`}>Welcome back {props.username}!</p>}
            <Button className="btn button-hover text-light" variant='danger' onClick={()=>navigate('/login')}>PLAY!</Button>
        </Container>
        </>
    );
}

function AppTitle(){

    const {theme} = useTheme();

    return (
        <>
            {theme==='light' && <p className='title' style={{color: '#8D99AE', textShadow: 'revert-layer'}}>
                What do you Meme?
            </p>}
            {theme==='dark' && <p className='title' style={{color: '#EDF2F4', textShadow: 'revert-layer'}}>
                What do you Meme?
            </p>}
    </>
    );
}

export default TitleScreen;