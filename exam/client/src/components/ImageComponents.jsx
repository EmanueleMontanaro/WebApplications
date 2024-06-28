import { Image } from "react-bootstrap";

function SlideImage(props){
    let imageStyle;
    if(props.option === 'menu') {
        imageStyle = {
            width: 1000,
            height: 600,
            borderRadius: 15
        }
    } else if(props.option === 'game'){
        imageStyle = {
            width: 800,
            height: 500,
            borderRadius: 15
        }
    } else if(props.option === 'row') {
        imageStyle = {
            width: 400,
            height: 200,
            borderRadius: 15,
            border: 'transparent'
        }
    }

    return(
        <Image src={props.prefix + props.src} style={imageStyle}/>
    );
}

export default SlideImage;

