import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Spinner from '../spinner';
import Loadable from 'react-loadable';
import styled from './index.module.scss';

const ArtifactMap = Loadable({
  loader: () => import('../map'),
  loading: Spinner
});
function ArtifactForm({
  title,
  buttonName,
  showModal,
  setShowModal,
  request,
  history,
  artifactData: { name, family_members: familyMembers, description, date, lat, lon }
}) {
  let nameRef = useRef();
  let famMembRef = useRef();
  let descRef = useRef();
  let dateRef = useRef();

  const [showMap, setShowMap] = useState(false);
  const [newLat, setLat] = useState(lat || 0);
  const [newLon, setLon] = useState(lon || 0);

  const setLatLon = (lat, lon) => {
    setLat(lat);
    setLon(lon);
  };

  const getLatLon = () => {
    return [newLat, newLon];
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setShowMap(false);
      }}
      onEnter={() => {
        setShowMap(true);
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
              defaultValue={date.split('T')[0]}
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
              <div className={styled['map']}>
                {showMap ? (
                  <ArtifactMap
                    draggable
                    className={styled['map-component']}
                    movable={{ setPos: setLatLon, getPos: getLatLon }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </Form.Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
            setShowMap(false);
          }}
          className={styled['button-grey']}
        >
          Close
        </button>
        <button
          className={styled['button-red']}
          onClick={() => {
            request({
              name: nameRef.value,
              family_members: famMembRef.value,
              description: descRef.value,
              date: dateRef.value,
              lat: newLat,
              lon: newLon
            }).then(() => {
              history.go(0);
            });
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
  history: PropTypes.shape({
    go: PropTypes.func.isRequired
  }).isRequired,
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
    date: '2000-01-01',
    lat: '',
    lon: ''
  }
};

const areEqual = (prevProps, nextProps) => {
  const check = [
    'title',
    'buttonName',
    'showModal',
    'setShowModal',
    'request',
    'history',
    'artifactData'
  ];
  return !check.some(keyText => {
    return prevProps[keyText] !== nextProps[keyText];
  });
};

const MemoisedArtifactForm = React.memo(ArtifactForm, areEqual);
export default withRouter(MemoisedArtifactForm);
