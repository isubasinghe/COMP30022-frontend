import React from 'react';
import { Modal } from 'react-bootstrap';
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
      {file.path} - {file.size} bytes
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
        <div className={styled['title']}>Add A Photo</div>
      </Modal.Header>
      <Modal.Body>
        <section className="container">
          <div {...getRootProps({ className: styled.dropzone })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
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
          onClick={() => {
            setShowModal(false);
          }}
          className={styled['button']}
        >
          Close
        </button>
        <button onClick={addPhoto} className={styled['button']}>
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default PhotoForm;
