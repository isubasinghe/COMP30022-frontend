import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Col } from 'react-bootstrap';
import styled from './index.module.scss';

function ArtifactForm({
  title,
  buttonName,
  showModal,
  setShowModal,
  request,
  artifactData: { name, family_members: familyMembers, description, date, lat, lon }
}) {
  let nameRef = useRef();
  let famMembRef = useRef();
  let descRef = useRef();
  let dateRef = useRef();
  let latRef = useRef();
  let lonRef = useRef();

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      size="lg"
      dialogClassName="artifact-modal"
    >
      <Modal.Header>
        <div className={styled.title}>{title}</div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewArtifact">
            <Form.Label className={styled['text-title']}>Name</Form.Label>
            <Form.Control
              className={styled['text-field']}
              ref={inputRef => {
                nameRef = inputRef;
              }}
              placeholder="Enter artifact name"
              defaultValue={name || ''}
            />
            <Form.Label className={styled['text-title']}>Date</Form.Label>
            <Form.Control
              className={styled['text-field']}
              ref={inputRef => {
                dateRef = inputRef;
              }}
              type="date"
              placeholder="Enter artifact date (YYYY-MM-DD)"
              defaultValue={date ? date.split('T')[0] : ''}
            />
            <Form.Label className={styled['text-title']}>Description</Form.Label>
            <Form.Control
              className={styled['text-field']}
              ref={inputRef => {
                descRef = inputRef;
              }}
              as="textarea"
              rows="3"
              placeholder="Enter artifact description"
              defaultValue={description || ''}
            />
            <Form.Label className={styled['text-title']}>Family Members</Form.Label>
            <Form.Control
              className={styled['text-field']}
              ref={inputRef => {
                famMembRef = inputRef;
              }}
              placeholder="Enter family members relevant to this artifact"
              defaultValue={familyMembers || ''}
            />

            <Form.Label className={styled['text-title']}>Location</Form.Label>
            <Form.Row>
              <Col>
                <Form.Control
                  className={styled['text-field']}
                  ref={inputRef => {
                    latRef = inputRef;
                  }}
                  placeholder="Enter latitude"
                  type="number"
                  step="0.1"
                  defaultValue={lat}
                />
              </Col>
              <Col>
                <Form.Control
                  className={styled['text-field']}
                  ref={inputRef => {
                    lonRef = inputRef;
                  }}
                  placeholder="Enter longitude"
                  type="number"
                  step="0.1"
                  defaultValue={lon}
                />
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
          }}
          className={styled['button-grey']}
        >
          Close
        </button>
        <button
          className={styled['button-red']}
          onClick={() => {
            request(
              nameRef.value,
              famMembRef.value,
              descRef.value,
              dateRef.value,
              latRef.value,
              lonRef.value
            );
          }}
          type="button"
        >
          {buttonName}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

ArtifactForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  artifactData: PropTypes.shape({
    name: PropTypes.string,
    family_members: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    lat: PropTypes.string,
    lon: PropTypes.string
  })
};

ArtifactForm.defaultProps = {
  artifactData: {
    name: '',
    family_members: '',
    description: '',
    date: '',
    lat: '',
    lon: ''
  }
};

export default ArtifactForm;
