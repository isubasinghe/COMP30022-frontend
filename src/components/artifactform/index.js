import React, { useRef } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import styled from './index.module.scss';

function ArtifactForm({ registerId, showModal, setShowModal }) {
  let nameRef = useRef();
  let famMembRef = useRef();
  let descRef = useRef();
  let dateRef = useRef();
  let latRef = useRef();
  let lonRef = useRef();

  const createNewArtifact = (name, familyMembers, description, date, lat, lon) => {
    const data = {
      register_id: registerId,
      name,
      family_members: familyMembers,
      description,
      date,
      lat,
      lon
    };

    authFetchRequest('https://api.airloom.xyz/api/v1/artifact/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(result => {
        setShowModal(false);
      })
      .catch(err => {
        alert(err.message + JSON.stringify(data));
      });
  };
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      size="lg"
      dialogClassName="artifact-modal"
    >
      <Modal.Header closeButton>
        <div className={styled['title']}>Create A New Artifact</div>
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
            />
            <Form.Label className={styled['text-title']}>Family Members</Form.Label>
            <Form.Control
              className={styled['text-field']}
              ref={inputRef => {
                famMembRef = inputRef;
              }}
              placeholder="Enter family members relevant to this artifact"
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
            />
            <Form.Label className={styled['text-title']}>Date</Form.Label>
            <Form.Control
              className={styled['text-field']}
              ref={inputRef => {
                dateRef = inputRef;
              }}
              type="date"
              placeholder="Enter artifact date (YYYY-MM-DD)"
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
                />
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => {
            setShowModal(false);
          }}
          className={styled['button']}
        >
          Close
        </button>
        <button
          type="submit"
          className={styled['button']}
          onClick={() =>
            createNewArtifact(
              nameRef.value,
              famMembRef.value,
              descRef.value,
              dateRef.value,
              latRef.value,
              lonRef.value
            )
          }
        >
          Create
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ArtifactForm;
