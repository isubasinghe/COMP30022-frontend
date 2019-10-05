import React, { useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import styled from './index.module.scss';

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
      size="lg"
      dialogClassName="register-modal"
    >
      <Modal.Header>
        <div className={styled['title']}>Create A New Register</div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewRegister">
            <Form.Label className={styled['text-title']}>Enter the name of the register</Form.Label>
            <Form.Control
              className={styled['text-field']}
              ref={inputRef => {
                nameRef = inputRef;
              }}
              placeholder="Name must not be empty"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setShowModal(false)} className={styled['button-teal']}>
          Cancel
        </button>
        <button
          onClick={() => createNewRegister(nameRef.value)}
          className={styled[`button-${nameRef.value ? 'red' : 'grey'}`]}
          disabled={nameRef.value !== ''}
        >
          Create
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterForm;
