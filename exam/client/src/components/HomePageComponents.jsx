import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Container, Alert, Row, Button } from "react-bootstrap";
import { useTheme } from "./themeContext";
import './custom.css'
import SlideImage from "./ImageComponents";

function HomePage(props){

    const navigate = useNavigate();

    const {theme} = useTheme();

    return(
        <>
           <Container className={`background-container-${theme} text-center`}>
           {props.message && <Row>
            <Alert variant={props.message.type} onClose={() => props.setMessage('')} dismissible>{props.message.msg}</Alert>
          </Row> }
           <SlideshowComponent/>
            <Button className={`btn button-${theme} text-${theme} mt-3 button-hover`} variant={`${theme==='light' ? 'dark' : 'light'}`} style={{fontSize: '24px'}} onClick={()=>navigate('/play')}>Play game <i className="bi bi-play-fill"/></Button>
           </Container>
        </>
    );
}

function SlideshowComponent(){

    const [index, setIndex] = useState(0);

    const {theme} = useTheme();

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
      };

    let backgroundGradient;

    if(theme==='light'){
        backgroundGradient='rgba(255, 255, 255, .6)';
    } else if (theme === 'dark') {
        backgroundGradient='rgba(0, 0, 0, .4)';
    }

    return(
        <Container className="align-items-center">
        <Carousel activeIndex={index} onSelect={handleSelect} variant={`${theme === 'light' ? 'dark' : 'light'}`}>
            <Carousel.Item>
                <SlideImage src={'cat-pointed-meme.jpeg'} prefix={"/example-memes/"} option={'menu'}/>
                <Carousel.Caption style={{background: backgroundGradient}}>
                <h3>Create wonderful memes!</h3>
                <p>With a variety of 50 captions</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <SlideImage src={'epic-handshake-meme.jpg'} prefix={"/example-memes/"} option={'menu'}/>
                <Carousel.Caption style={{background: backgroundGradient}}>
                <h3>Score as many points as you can!</h3>
                <p>Make your friends envy ;)</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <SlideImage src={'flex-tape-meme.jpeg'} prefix={"/example-memes/"} option={'menu'}/>
                <Carousel.Caption style={{background: backgroundGradient}}>
                <h3>Have fun!</h3>
                <p>
                    Life is about smiling :)
                </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </Container>
    );
}

export default HomePage;