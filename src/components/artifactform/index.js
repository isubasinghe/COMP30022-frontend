import React, { useRef } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';

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
    >
      <Modal.Header closeButton>
        <Modal.Title>Create A New Artifact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={inputRef => {
                nameRef = inputRef;
              }}
              placeholder="Enter artifact name"
            />
            <Form.Label>Family Members</Form.Label>
            <Form.Control
              ref={inputRef => {
                famMembRef = inputRef;
              }}
              placeholder="Enter family members relevant to this artifact"
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={inputRef => {
                descRef = inputRef;
              }}
              as="textarea"
              rows="3"
              placeholder="Enter artifact description"
            />
            <Form.Label>Date</Form.Label>
            <Form.Control
              ref={inputRef => {
                dateRef = inputRef;
              }}
              type="date"
              placeholder="Enter artifact date (YYYY-MM-DD)"
            />
            <Form.Label>Location</Form.Label>
            <Form.Row>
              <Col>
                <Form.Control
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
                  ref={inputRef => {
                    lonRef = inputRef;
                  }}
                  placeholder="Enter longitude"
                  type="number"
                  step="0.1"
                />
              </Col>
            </Form.Row>
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
        <Button
          type="submit"
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
          variant="primary"
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ArtifactForm;
