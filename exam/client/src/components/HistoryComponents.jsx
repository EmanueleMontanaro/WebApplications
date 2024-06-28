import './custom.css';
import { useEffect, useState } from 'react';
import { useTheme } from './themeContext';
import { useNavigate } from 'react-router-dom';
import API from './API.mjs';
import { Col, Row, Container, Table, Button } from 'react-bootstrap';

function HistoryPage(props) {
    const navigate = useNavigate();

    const {theme} = useTheme();

    const [history, setHistory] = useState([]);
    const [waiting, setWaiting] = useState(true);

    const getHistory = async() => {
        const newHistory = await API.getHistory(props.user.id);
        setHistory(newHistory);
        setWaiting(false);
    }

    useEffect(() => {
        if(!props.login){
            navigate('/home');
        }
        getHistory();
    }, [])

    return( 
        <Container className={`background-container-${theme} text-center align-items-center d-flex flex-column`}>
            <h1 className={`mt-3 text-opposite-${theme}`}>{props.user.name}</h1>
            <Row>
                <h3 className={`mt-2 text-opposite-${theme}`}>Email: {props.user.username}</h3>
            </Row>
            <h2 className={`text-opposite-${theme} mt-5`}>Games history:</h2>
            {(waiting || !history) && <h1>Loading...</h1>}
            {!waiting && history && <Table striped className={`mt-3 history-table-${theme} text-center text-opposite-${theme}`} style={{width: '700px'}}>
            <thead>
              <tr>
                <th className={`col-sm-6 text-opposite-${theme}`}>Date</th>
                <th className='col-sm-6'>Total Score</th>
              </tr>
            </thead>
            <tbody>
                    {history.map(match => <MatchRow match={match} key={match.id} setRecap={props.setRecap} setMode={props.setMode}/>)}
            </tbody>
                </Table>}
                <Button className={`btn button-${theme} text-${theme} mt-3 button-hover`} variant={`${theme==='light' ? 'dark' : 'light'}`} style={{fontSize: '24px'}} onClick={()=>navigate('/home')}><i className="bi bi-house-fill"/> Back to main menu</Button>
        </Container>
    );
}

function MatchRow(props){
    const navigate = useNavigate();

    let rounds = [
        {
            src: props.match.src1,
            text: props.match.text1,
            correct: !!props.match.value1
        },
        {
            src: props.match.src2,
            text: props.match.text2,
            correct: !!props.match.value2
        },
        {
            src: props.match.src3,
            text: props.match.text3,
            correct: !!props.match.value3
        }
    ]

    const handleSelect = () => {
        props.setMode('history');
        props.setRecap(rounds);
        navigate('/recap');
    }

    return(
        <tr onClick={handleSelect}>
            <td>
                <h3 style={{background: 'transparent'}}>{props.match.date} at {props.match.hour}</h3>
            </td>
            <td>
                <h3 style={{background: 'transparent'}}>Total score: {props.match.score}</h3>
            </td>
        </tr>
    );
}

export default HistoryPage;