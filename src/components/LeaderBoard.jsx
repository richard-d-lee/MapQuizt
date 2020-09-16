import axios from 'axios';
import React, { useState } from 'react';
import 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

function MyModal(props) {
  if (props.data !== undefined) {
    const listGroup = props.data.map((item) => {
    return <ListGroup.Item>{item[0]}: {item[1]}</ListGroup.Item>
    })
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>
            Current Leaderboard
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <ListGroup>
                {listGroup}
              </ListGroup>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>
            Current Leaderboard
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                {/* {listGroup} */}
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

function Leaderboard(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button id="button" variant="primary" onClick={() => setModalShow(true)}>
        View Leaderboard
      </Button>
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={props.data}
      />
    </>
  );
}

export default Leaderboard;