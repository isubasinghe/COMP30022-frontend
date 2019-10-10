import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import styled from './index.module.scss';

import authFetchRequest from '../../utils/auth/cognitoFetchRequest';

function PhotoForm({ artifactId, registerId, showModal, setShowModal, history }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png'
  });
  const addPhoto = () => {
    setShowModal(false);
    const promisedRequests = acceptedFiles.map(file => {
      const formData = new FormData();
      formData.append('registerId', registerId);
      formData.append('artifactId', artifactId);
      formData.append('photo', file);
      return authFetchRequest('https://api.airloom.xyz/api/v1/artifact/addphoto/', {
        method: 'POST',
        body: formData
      }).then(result => {
        console.log(result);
      });
    });

    Promise.all(promisedRequests)
      .then(() => {
        history.go(0);
      })
      .catch(() => {});
  };

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      <p>
        {file.path} -{file.size} bytes
      </p>
    </li>
  ));

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      size="lg"
      dialogClassName="photo-modal"
    >
      <Modal.Header>
        <div className={styled.title}>Add Photos</div>
      </Modal.Header>
      <Modal.Body>
        <section className="container">
          <div {...getRootProps({ className: styled.dropzone })}>
            <input {...getInputProps()} />
            <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
          </div>
          {files.length !== 0 ? (
            <>
              <br />
              <aside>
                <div className={styled['text-title']}>Files</div>
                <ul>{files}</ul>
              </aside>
            </>
          ) : (
            <></>
          )}
        </section>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
          }}
          className={styled['button-teal']}
        >
          Close
        </button>
        <button onClick={addPhoto} className={styled['button-red']} type="button">
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
}

PhotoForm.propTypes = {
  registerId: PropTypes.string.isRequired,
  artifactId: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    go: PropTypes.func.isRequired
  }).isRequired
};

export default PhotoForm;
