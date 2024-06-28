import './custom.css'
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useTheme } from './themeContext';
import { useState, useEffect } from 'react';
import API from './API.mjs';
import SlideImage from './ImageComponents';
import { useNavigate } from 'react-router-dom';
import Resume from './ResumeComponents.jsx';

function PlayPage(props){
    const navigate = useNavigate();

    const {theme} = useTheme();

    const [memes, setMemes] = useState();
    const [waiting,setWaiting] = useState(false);
    const [count, setCount] = useState(0);
    const [resume, setResume] = useState(false);
    const [choice, setChoice] = useState();
    const [timer, setTimer] = useState(30);

    const getMemes = async() => {
        const memes = await API.getRandomMeme(props.login);
        setMemes(memes);
      }
    
      useEffect(() => {
        setWaiting(true);
        setTimeout(() => {
            setWaiting(false);
            setTimer(30);
        }, 3000);
      }, [count]);

      useEffect(() => {
        props.setRecap([]);
        getMemes();
      }, []);

      useEffect(() => {
        if(timer === 0) handleSelect({id: 0, text: 'Time expired!!'});

        const intervalId = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      },[timer])

      const handleSelect = (ans) => {
        if(props.login){
            if(count < 2) {
                setTimer(30);
                setChoice(ans);
                setResume(true);
                setTimeout(() => {
                    setResume(false);
                    setCount(count+1);
                }, 5000); 
            } else {
                setTimer(30);
                setChoice(ans);
                setResume(true);
                setTimeout(() => {
                    setResume(false);
                    props.setMode('recap');
                    navigate('/recap');
            }, 5000);
            }
        }else {
            setTimer(30);
            setChoice(ans);
            setResume(true);
            setTimeout(() => {
                setResume(false);
                props.setMode('recap');
                navigate('/recap');
            }, 5000); 
        }
      }

    return(
        <>  
            <Container className={`background-container-${theme} align-items-center d-flex flex-column justify-content-center`}>
                {waiting && props.login && <h1 className={`text-opposite-${theme}`}>Round {count+1} starting...</h1>}
                {waiting && !props.login &&<h1 className={`text-opposite-${theme}`}>Round starting...</h1>}
                {!resume && !waiting && memes && props.login && <LoggedPlay memes={memes} count={count} handleSelect={handleSelect} timer={timer}/>}
                {!resume && !waiting && memes && !props.login && <AnonymousPlay meme={memes} handleSelect={handleSelect} timer={timer}/>}
                {resume && <Resume choice={choice} meme={props.login ? memes[count] : memes} count={count} setCount={setCount} recap={props.recap} setRecap={props.setRecap}/>}
            </Container>
        </>
    );
}

function LoggedPlay(props){
    return(
        <> 
        <SlideImage src={props.memes[props.count].src} prefix={"/memes/"} option={'game'}/>
        <ProgressBar timer={props.timer}/>
        <Row className='justify-content-center mt-3'>
            {props.memes[props.count].answers.map((ans)=><AnswerCard className="ml-3" key={ans.id} answer={ans} handleSelect={props.handleSelect}/>)}
        </Row>
    </>
    );
}

function AnonymousPlay(props){
    return(
        <> 
            <SlideImage src={props.meme.src} prefix={"/memes/"} option={'game'}/>
            <ProgressBar timer={props.timer}/>
            <Row className='justify-content-center mt-3'>
                {props.meme.answers.map((ans)=><AnswerCard className="ml-3" key={ans.id} answer={ans} handleSelect={props.handleSelect}/>)}
            </Row>
        </>
    );
}

function AnswerCard(props){
    const {theme} = useTheme();

    return(
            <Card style={{ width: '180px', height: '250px', marginInline: "5px"}} className={`background-opposite-${theme} card-hover`} onClick={()=>props.handleSelect(props.answer)}> 
                <Card.Body className="d-flex align-items-center text-center">
                    <Card.Title className={`text-${theme}`}>{props.answer.text}</Card.Title>
                </Card.Body>
            </Card>
    );
}

function ProgressBar(props){
    const {theme} = useTheme();

    let barcolor = '';

    if(theme==='light'){
        barcolor = 'black';
    } else {
        barcolor = '#666565';
    }

    const styles = {
        container: {
          width: '870px',
          backgroundColor: '#e0e0df',
          borderRadius: '5px',
          overflow: 'hidden',
          
        },
        progressBar: {
          height: '15px',
          backgroundColor: barcolor,
          transition: 'width 0.1s linear',
        },
      };

      return (
        <Row className='mt-3 align-items-center d-flex align-items-center'>
            <Col className='col-sm-7'>
            <div style={styles.container}>
          <div style={{ ...styles.progressBar, width: `${props.timer*3.3333333}%` }}></div>
          </div>
          </Col>
        </Row>
      );
}

export default PlayPage;