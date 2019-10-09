import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'react-bootstrap';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import { addMember, delMember, updateMember } from './requests';
import { withRouter } from 'react-router-dom';
import DeleteModal from '../deletemodal';
import styled from './index.module.scss';

function Settings({ registerId, showModal, setShowModal, history }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let emailRef = useRef();
  let adminRef = useRef();

  const deleteRegister = () => {
    const data = {
      register_id: registerId
    };

    authFetchRequest(`https://api.airloom.xyz/api/v1/register/delregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        setShowModal(false);
        history.push(``);
      })
      .catch(() => {});
  };

  return (
    <>
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
            type="button"
            className={styled['button-red']}
            onClick={() => {
              addMember(registerId, emailRef.value, adminRef.checked)
                .then(() => {
                  setShowModal(false);
                })
                .catch(() => {});
            }}
          >
            Add
          </button>
          <button
            type="button"
            className={styled['button-red']}
            onClick={() => {
              delMember(registerId, emailRef.value)
                .then(() => {
                  setShowModal(false);
                })
                .catch(() => {});
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className={styled['button-red']}
            onClick={() => {
              updateMember(registerId, emailRef.value, adminRef.checked)
                .then(() => {
                  setShowModal(false);
                })
                .catch(() => {});
            }}
          >
            Update
          </button>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={() => {
              setShowDeleteModal(true);
            }}
            className={styled['button-red']}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => {
              setShowModal(false);
            }}
            className={styled['button-grey']}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <DeleteModal
        onConfirmation={deleteRegister}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      />
    </>
  );
}

Settings.propTypes = {
  registerId: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Settings);
