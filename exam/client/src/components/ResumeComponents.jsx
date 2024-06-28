import { useEffect, useState } from "react";
import API from "./API.mjs";
import SlideImage from "./ImageComponents";
import React from "react";
import { Row, Card, Col, Container } from "react-bootstrap";
import { useTheme } from "./themeContext";

function Resume(props) {

    const {theme} = useTheme();

    const [answers,setAnswers] = useState();
    const [waiting, setWaiting] = useState(false);
    const [correct, setCorrect] = useState(false);

    const getAnswers = async () => {
        const correctAnswers = await API.getAnswers(props.meme.id);
        setAnswers(correctAnswers);
        setWaiting(false);
        setCorrect(Object.values(correctAnswers).some(ans => ans.id === props.choice.id))
        const round = {correct: Object.values(correctAnswers).some(ans => ans.id === props.choice.id), text: props.choice.text, src: props.meme.src};
        const newRecap = [...props.recap, round];
        props.setRecap(newRecap);
    }

    useEffect(() => {
        setWaiting(true);
        getAnswers(); 
      }, []);


      return(
        <>  {waiting && <h1>Loading...</h1>}
            {!waiting && answers && <>
                <SlideImage src={props.meme.src} prefix={"/memes/"} option={'game'}/>
                <Row className="text-center" style={{width: '100%'}}>
                    <Col className='col-sm-6'>
                    <h2 className={`text-opposite-${theme}`}>Correct answers:</h2>
                    </Col>
                    
                    <Col className='col-sm-6'>
                    <h2 className={`text-opposite-${theme}`}>Your choice:</h2>
                    </Col>
                    
                </Row>
                <Container fluid>
                <Row className="justify-content-center text-center">
                    <Col className='col-sm-6 d-flex justify-content-center'>
                    {answers.map((ans) => (
                        <CorrectAnswerCard answer={ans} key={ans.id} />
                    ))}
                    </Col>
                    <Col className='col-sm-6 d-flex justify-content-center'>
                    <ChoosenAnswerCard answer={props.choice} correct={correct} />
                    </Col>
                </Row>
                </Container>
            </>}
        </>
    );
}

function CorrectAnswerCard(props){
    const {theme} = useTheme();

    return(
            <Card style={{ width: '180px', height: '250px', marginInline: "5px"}} className="bg-success"> 
                <Card.Body className="d-flex align-items-center text-center">
                    <Card.Title className={`text-opposite-${theme}`}>{props.answer.text}</Card.Title>
                </Card.Body>
            </Card>
    );
}

function ChoosenAnswerCard(props){
    const {theme} = useTheme();

    let bgcolor;
    if(props.correct){
        bgcolor = "bg-success";
    } else {
        bgcolor = "bg-danger"
    }
    return(
            <Card style={{ width: '180px', height: '250px', marginInline: "5px"}} className={bgcolor}> 
                <Card.Body className="d-flex align-items-center text-center">
                    <Card.Title className={`text-opposite-${theme}`}>{props.answer.text}</Card.Title>
                </Card.Body>
            </Card>
    );
}

export default Resume;