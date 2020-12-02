import axios from 'axios';
import React, { useState } from 'react';
import 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function MyModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title>
          Create an account to access features!
          </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Form>
              <Form.Group controlId="formBasicId">
                <Form.Label>Enter your username</Form.Label>
                <Form.Control placeholder="e.g. DigDug543" onChange={props.onIdChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPass">
                <Form.Label>Enter your password</Form.Label>
                <Form.Control type="password"
                onChange={props.onPassChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassDupe">
                <Form.Label>Re-enter your password</Form.Label>
                <Form.Control type="password"
                onChange={props.onPassDupeChange}/>
              </Form.Group>
              <Button onClick={() => {
                props.onCreateSubmit();
                props.onHide()
              }} variant="primary" >
                Submit
            </Button>
            </Form>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}



function Create(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button className="accountCreator" variant="primary" onClick={() => setModalShow(true)}>
        Create an Account
      </Button>
      <MyModal
        onIdChange={props.onIdChange}
        onPassChange={props.onPassChange}
        onPassDupeChange={props.onPassDupeChange}
        show={modalShow}
        onHide={() => setModalShow(false)}
        onCreateSubmit={props.onCreateSubmit}
      />
    </>
  );
}

export default Create;