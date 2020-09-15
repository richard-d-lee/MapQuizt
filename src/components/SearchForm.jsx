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
        <Modal.Title id="contained-modal-title-vcenter">
          Enter someplace you'd like to visit!
          </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Form>
              <Form.Group controlId="formBasicSearch">
                <Form.Label>Enter a location!</Form.Label>
                <Form.Control placeholder="e.g. Galvanize Boulder" onChange={props.onChange}/>
              </Form.Group>
              <Button  onClick={() => {
                props.onSubmit()
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

function SearchForm(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button id="button" variant="primary" onClick={() => setModalShow(true)}>
        Choose a location!
      </Button>
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSubmit={props.onFormSubmit}
        onChange={props.onFormChange}
      />
    </>
  );
}

export default SearchForm;