import React, { useState } from 'react';
import 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'

function MydModalWithGrid(props) {
  let randomArray = [];
  let randomAnswers = [];
  let newQuestion = '';
  if (props.question.question === "Submit Your Answers!") {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.question.question}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Button className="button" onClick={() => {
                props.onAlert();
                props.onSubmit();
                props.onHide()
              }}>Submit</Button>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  if (props.question.correct_answer !== undefined && props.question.correct_answer.length > 0) {
    let newQuestion = props.question.question.replace('&quot;', '"')
    newQuestion = newQuestion.replace('&quot;', '"')
    newQuestion = newQuestion.replace('&#039;', '"')
    newQuestion = newQuestion.replace('&#039;', '"')
    if (props.question.incorrect_answers.length < 2) {
      const answerList = [props.question.correct_answer, props.question.incorrect_answers[0]];
      while (randomAnswers.length < 2) {
        let randomNumber = Math.floor(Math.random() * 2);
        if (randomArray.indexOf(randomNumber) === -1) {
          randomAnswers.push(answerList[randomNumber]);
          randomArray.push(randomNumber);
        }
      }
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <div className="quizNum">{props.questionCount}/50   </div>
              {newQuestion}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row className="button"><Button onClick={() => { props.onSubmit(randomAnswers[0]) }}>{randomAnswers[0]}</Button></Row>
              <Row className="button"><Button onClick={() => { props.onSubmit(randomAnswers[1]) }}>{randomAnswers[1]}</Button></Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
          <Container><h4><Badge variant="secondary">{props.question.difficulty}</Badge></h4></Container>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    } else {
      const answerList = [props.question.correct_answer, props.question.incorrect_answers[0], props.question.incorrect_answers[1], props.question.incorrect_answers[2]];
      while (randomAnswers.length < 4) {
        let randomNumber = Math.floor(Math.random() * 4);
        if (randomArray.indexOf(randomNumber) === -1) {
          randomAnswers.push(answerList[randomNumber]);
          randomArray.push(randomNumber);
        }
      }
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="quizNum">{props.questionCount}/50   </div>
              {newQuestion}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row className="button"><Button onClick={() => { props.onSubmit(randomAnswers[0]) }}>{randomAnswers[0]}</Button></Row>
              <Row className="button"><Button onClick={() => { props.onSubmit(randomAnswers[1]) }}>{randomAnswers[1]}</Button></Row>
              <Row className="button"><Button onClick={() => { props.onSubmit(randomAnswers[2]) }}>{randomAnswers[2]}</Button></Row>
              <Row className="button"><Button onClick={() => { props.onSubmit(randomAnswers[3]) }}>{randomAnswers[3]}</Button></Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
          <Container><h4><Badge variant="secondary">{props.question.difficulty}</Badge></h4></Container>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  } else {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.question}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Button className="button" onClick={props.onSubmit}>Oh No!</Button>
          </Container>
        </Modal.Body>
        <Modal.Footer>
        <Container><h4><Badge variant="secondary">New</Badge></h4></Container>
        </Modal.Footer>
      </Modal>
    )
  }
}


function Quizzer(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button id="button" variant="primary" onClick={() => setModalShow(true)}>
        Take the quiz!
      </Button>
      <MydModalWithGrid
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSubmit={props.onSubmit}
        question={props.question}
        onAlert={props.onAlert}
        questionCount={props.count + 1}
      />
    </>
  );
}

export default Quizzer;
