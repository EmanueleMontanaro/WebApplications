import {Row,Col,Table, Button} from 'react-bootstrap';

function Answers(props) {
    return(
        <>
            <Row>
                <Col as='h2'>Answers:</Col>
            </Row>
            <Row>
                <Col lg={10} className="mx-auto">
                    <AnswerTable answers={props.answers}></AnswerTable>
                </Col>
            </Row>
        </>
    )
}

function AnswerTable(props) {
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Text</th>
                    <th>Author</th>
                    <th>Score</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.answers.map((ans) => <AnswerRow answer={ans} key={ans.id}/>)}
            </tbody>
        </Table>
    )
}

function AnswerRow(props) {
    return (
        <tr>
            <AnswerData answer={props.answer} /><AnswerAction />
        </tr>
    )
}

function AnswerData(props) {
    return (
        <>
            <td>
                {props.answer.date.format('YYYY-MM-DD')}
            </td>
            <td>
                {props.answer.text}
            </td>
            <td>
                {props.answer.email}
            </td>
            <td>
                {props.answer.score}
            </td>
        </>
    )
}

function AnswerAction() {
    return (
        <td>
            <Button variant='warning'> Vote Up </Button>
            <Button variant='primary'>  Edit </Button>
            <Button variant='danger'> Delete </Button>
        </td>
    )
}

export default Answers;