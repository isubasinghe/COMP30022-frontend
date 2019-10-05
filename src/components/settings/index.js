import React, { useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { addMember, delMember, updateMember } from './requests';
import styled from './index.module.scss';

function Settings({ registerId, showModal, setShowModal }) {
  let emailRef = useRef();
  let adminRef = useRef();

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      size="lg"
      dialogClassName="settings-modal"
    >
      <Modal.Header>
        <div className={styled['title']}>Register Settings</div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAddMember">
            <Form.Row>
              <Form.Label className={styled['text-title']}>
                Add, Delete, or Update a Register Member
              </Form.Label>
              <Form.Control
                className={styled['text-field']}
                ref={inputRef => {
                  emailRef = inputRef;
                }}
                placeholder="Enter member's email"
              />
              <Form.Check
                inline
                label="Make Admin?"
                ref={inputRef => {
                  adminRef = inputRef;
                }}
              />
            </Form.Row>
          </Form.Group>
        </Form>
        <button
          type="submit"
          className={styled['button-red']}
          onClick={() => {
            addMember(registerId, emailRef.value, adminRef.checked)
              .then(result => {
                setShowModal(false);
              })
              .catch(err => {
                alert(err.message);
              });
          }}
        >
          Add
        </button>
        <button
          type="submit"
          className={styled['button-red']}
          onClick={() => {
            delMember(registerId, emailRef.value)
              .then(result => {
                setShowModal(false);
              })
              .catch(err => {
                alert(err.message);
              });
          }}
        >
          Delete
        </button>
        <button
          type="submit"
          className={styled['button-red']}
          onClick={() => {
            updateMember(registerId, emailRef.value, adminRef.checked)
              .then(result => {
                setShowModal(false);
              })
              .catch(err => {
                alert(err.message);
              });
          }}
        >
          Update
        </button>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => {
            setShowModal(false);
          }}
          className={styled['button-grey']}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default Settings;
