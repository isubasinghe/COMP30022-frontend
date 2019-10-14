import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'react-bootstrap';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import styled from './index.module.scss';

function RegisterForm({ addRegister, showModal, setShowModal }) {
  let nameRef = useRef();

  const createNewRegister = registerName => {
    const data = {
      name: registerName
    };

    authFetchRequest('https://api.airloom.xyz/api/v1/register/addregister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        addRegister({ ...data, is_admin: true });
        setShowModal(false);
      })
      .catch(() => {});
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={closeModal} size="lg" dialogClassName="register-modal">
      <Modal.Header>
        <div className={styled.title}>Create A New Register</div>
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
              placeholder="Enter register name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={closeModal} className={styled['button-grey']}>
          Cancel
        </button>
        <button
          type="button"
          onClick={() => createNewRegister(nameRef.value)}
          className={styled['button-red']}
        >
          Create
        </button>
      </Modal.Footer>
    </Modal>
  );
}

RegisterForm.propTypes = {
  addRegister: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default RegisterForm;
