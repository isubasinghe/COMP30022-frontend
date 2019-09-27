/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import styled from './index.module.scss';

function ArtifactView(props) {
  const [artifact, setArtifact] = useState(undefined);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoCount, setPhotoCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { acceptedFiles, rejectedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png'
  });
  const { registerId, artifactId } = props.match.params;

  // TODO: write a hook to replicate useEffect authenticated fetch
  useEffect(() => {
    if (registerId !== null && artifactId !== null) {
      authFetchRequest(
        `https://api.airloom.xyz/api/v1/register/artifact/${registerId}/${artifactId}`,
        {}
      )
        .then(data => {
          if (data.length === 0) {
            setErrorState(true);
            setHasLoaded(true);
          } else {
            const artifactData = data[0];
            setArtifact(artifactData);
            setPhotoCount(artifactData.photos.length);
            setHasLoaded(true);
          }
        })
        .catch(err => {
          setErrorState(true);
          setHasLoaded(true);
        });
    }
  }, [registerId, artifactId]);

  if (!hasLoaded) {
    return <div className="loading">Loading your request</div>;
  }
  if (errorState) {
    return <div className="error">Something went wrong with your request, woops</div>;
  }

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

  const submitButtonClass =
    acceptedFiles.length > 0 ? styled['submit-button--enabled'] : styled['submit-button--disabled'];

  return (
    <>
      <div className={styled['container']}>
        <div className={styled['name']}>{artifact.name}</div>
        <div className={styled['artifact-container']}>
          <div className={styled['column']}>
            <div className={styled['photo-container']}>
              <img
                className={styled['photo']}
                src={photoCount !== 0 ? artifact.photos[photoIndex].url : ''}
                alt="No Images Found. Try add some below with the '+'"
              />
            </div>
            <button
              type="button"
              className={styled['button']}
              onClick={() => setPhotoIndex((photoIndex + 1) % photoCount)}
            >
              &larr;
            </button>
            {artifact.is_admin ? (
              <button type="button" className={styled['button']} onClick={() => setShowModal(true)}>
                +
              </button>
            ) : (
              <></>
            )}
            <button
              type="button"
              className={styled['button']}
              onClick={() => setPhotoIndex((photoIndex + photoCount - 1) % photoCount)}
            >
              &rarr;
            </button>
          </div>
          <div className={styled['column']}>
            {[
              { title: 'Location', data: `${artifact.lat}, ${artifact.lon}` },
              { title: 'Date', data: new Date(artifact.date).toISOString().split('T')[0] },
              { title: 'Family Members', data: artifact.family_members },
              { title: 'Description', data: artifact.description }
            ].map(({ title, data }) => (
              <>
                <div key={`title-${title}-${data}`} className={styled['title']}>
                  {title}
                </div>
                <div key={`data-${title}-${data}`} className={styled['data']}>
                  {data}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>Add a photo</Modal.Header>
        <Modal.Body>
          <section className="container">
            <div {...getRootProps({ className: styled['dropzone'] })}>
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
    </>
  );
}

ArtifactView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      registerId: PropTypes.string.isRequired,
      artifactId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default ArtifactView;
