import { Container, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./themeContext";
import { useEffect, useState } from "react";
import SlideImage from "./ImageComponents";
import './custom.css';
import dayjs from 'dayjs';
import API from "./API.mjs";


function RecapPage(props){
    const navigate = useNavigate();

    const {theme} = useTheme();

    const [waiting,setWaiting] = useState(true);
    const [score, setScore] = useState(0);

    let match;

    const postMatch = async(match) => {
        await API.postMatch(match);
    }

    useEffect(() => {
        let newScore = 0;
        for(let element of props.recap){
            if(element.correct){
                newScore+=5;
            }
        }
        setScore(newScore);
        if(props.login && !match && props.mode === 'recap'){
            match = {
                userId: props.userid,
                date: dayjs().format('YYYY-MM-DD'),
                hour: dayjs().format('HH:mm'), 
                src1: props.recap[0].src,
                text1: props.recap[0].text,
                value1: props.recap[0].correct,
                src2: props.recap[1].src,
                text2: props.recap[1].text,
                value2: props.recap[1].correct,
                src3: props.recap[2].src,
                text3: props.recap[2].text,
                value3: props.recap[2].correct,
                score: newScore
                }
            
            postMatch(match);
        }
        setWaiting(false);
    },[props.recap]);

    return(<>
        <Container className={`background-container-${theme} justify-content-center text-center`}>
            {waiting && <h1>Loading...</h1>}
            {!waiting && <>
            {props.recap.map((row) => <RoundRow row={row} key={row.src} mode={props.mode}/>)}
            <h1 className={`text-opposite-${theme}`}>Total score: {score}</h1>
            {!props.login && <h4 className={`text-opposite-${theme}`}>Create or <Link to='/login'>log into an account</Link> for a better experience!</h4>}
            {props.mode === 'recap' && <Button className={`btn button-${theme} button-hover text-${theme} mt-3`} variant={`${theme==='light' ? 'dark' : 'light'}`} style={{fontSize: '24px'}} onClick={()=>navigate('/home')}> <i className="bi bi-house-fill"/> Back to main menu</Button>}
            {props.mode === 'history' && <Button className={`btn button-${theme} button-hover text-${theme} mt-3`} variant={`${theme==='light' ? 'dark' : 'light'}`} style={{fontSize: '24px'}} onClick={()=>navigate('/profile')}> <i className="bi bi-person-fill"/> Back to profile page</Button>}
            </>}
        </Container>
    </>);
}

function RoundRow(props){
    const {theme} = useTheme();

    let bgcolor = '';
    if(props.row.correct) {
        bgcolor='rgba(92, 184, 92, .6)';
    } else {
        bgcolor='rgba(217, 83, 79, .6)';
    }

    return(
    <>
        {props.mode === 'history' && <Row className='align-items-center mb-3 text-center' style={{background: bgcolor}}>
            <Col>
                <SlideImage src={props.row.src} prefix={'/memes/'} option={'row'} className='my-2'/>
            </Col>
            <Col>
                <h2 className={`text-opposite-${theme}`} style={{background:'transparent'}}>{props.row.text}</h2>
            </Col>
            <Col>
                {props.row.correct && <h1 className={`text-opposite-${theme}`} style={{background:'transparent'}}>+5 Points!</h1>}
                {!props.row.correct && <h1 className={`text-opposite-${theme}`} style={{background:'transparent'}}>0 Points :(</h1>}
            </Col>
        </Row>}
        {props.mode === 'recap' && props.row.correct && <Row className='align-items-center mb-3 text-center' style={{background: bgcolor}}>
            <Col>
                <SlideImage src={props.row.src} prefix={'/memes/'} option={'row'} className='my-2'/>
            </Col>
            <Col>
                <h2 className={`text-opposite-${theme}`} style={{background:'transparent'}}>{props.row.text}</h2>
            </Col>
            <Col>
                <h1 className={`text-opposite-${theme}`} style={{background:'transparent'}}>+5 Points!</h1>
            </Col>
        </Row>}
    </>
    );
}

export default RecapPage;