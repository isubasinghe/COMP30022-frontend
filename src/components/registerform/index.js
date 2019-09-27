import React, { useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';

function RegisterForm({ refetchRegisters, showModal, setShowModal }) {
  let nameRef = useRef();

  const createNewRegister = registerName => {
    const data = {
      name: registerName
    };

    JSON.stringify(data);

    authFetchRequest('https://api.airloom.xyz/api/v1/register/addregister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(result => {
        refetchRegisters();
        setShowModal(false);
      })
      .catch(err => {
        alert(err.message);
      });
  };
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create new Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Enter the name of the register</Form.Label>
            <Form.Control
              ref={inputRef => {
                nameRef = inputRef;
              }}
              placeholder="Enter register name"
            />
            <Form.Text className="text-muted">
              We'll never share your data with anyone else.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Close
        </Button>
        <Button onClick={() => createNewRegister(nameRef.value)} variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterForm;
