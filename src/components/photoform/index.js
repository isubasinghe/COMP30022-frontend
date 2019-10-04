import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import styled from './index.module.scss';

import authFetchRequest from '../../utils/auth/cognitoFetchRequest';

function PhotoForm({ artifactId, registerId, showModal, setShowModal }) {
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
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} -{file.size} bytes
    </li>
  ));

  const submitButtonClass =
    acceptedFiles.length > 0 ? styled['submit-button--enabled'] : styled['submit-button--disabled'];

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>Add a photo</Modal.Header>
      <Modal.Body>
        <section className="container">
          <div {...getRootProps({ className: styled.dropzone })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </section>
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
        <Button className={submitButtonClass} onClick={addPhoto} variant="primary">
          Add a photo
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PhotoForm;
