import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import styled from './index.module.scss';

function DeleteModal({ onConfirmation, showModal, setShowModal }) {
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      size="lg"
      dialogClassName="delete-modal"
    >
      <Modal.Header>
        <div className={styled.title}>Are you sure you want to do this?</div>
      </Modal.Header>

      <Modal.Footer>
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
          }}
          className={styled['button-grey']}
        >
          Cancel
        </button>
        <button
          className={styled['button-red']}
          onClick={() => {
            onConfirmation();
            setShowModal(false);
          }}
          type="button"
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}

DeleteModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  onConfirmation: PropTypes.func.isRequired
};

export default DeleteModal;
