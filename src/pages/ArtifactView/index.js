/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Media } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import Spinner from '../../components/spinner';
import PhotoForm from '../../components/photoform';
import UpdateArtifactForm from '../../components/updateartifactform';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import styled from './index.module.scss';

function ArtifactView({
  match: {
    params: { registerId, artifactId }
  }
}) {
  const [artifact, setArtifact] = useState(undefined);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoCount, setPhotoCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
            // preload image assets
            artifactData.photos.forEach((artifactCurr, i) => {
              if (i !== 0) {
                new Image().src = artifactCurr.url;
              }
            });
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

  const refresh = () => {
    registerId = registerId;
  };

  if (!hasLoaded) {
    return <Spinner />;
  }
  if (errorState) {
    return <div className="error">Something went wrong with your request, whoops</div>;
  }

  return (
    <>
      <Container className={styled['container']}>
        <Container className={styled['name']}>{artifact.name}</Container>
        <Container className={styled['artifact-container']}>
          <Row>
            <Col xs={12} md={6}>
              <Media className={styled['photo-container']}>
                <img
                  className={styled['photo']}
                  src={photoCount !== 0 ? artifact.photos[photoIndex].url : ''}
                  alt={`No photos found.${
                    artifact.is_admin ? " Try add some below with the '+'" : ''
                  }`}
                />
              </Media>
            </Col>
            <Col>
              {[
                { title: 'Date', data: moment(artifact.date).format('dddd, MMMM Do YYYY') },
                { title: 'Description', data: artifact.description },
                { title: 'Family Members', data: artifact.family_members },
                { title: 'Location', data: `${artifact.lat}, ${artifact.lon}` }
              ].map(({ title, data }) => (
                <div key={`${title}`}>
                  <div key={`title-${title}-${data}`} className={styled['title']}>
                    {title}
                  </div>
                  <div key={`data-${title}-${data}`} className={styled['data']}>
                    {data}
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                type="button"
                className={styled['button-teal']}
                onClick={() => setPhotoIndex((photoIndex + 1) % photoCount)}
              >
                &larr;
              </Button>
            </Col>
            {artifact.is_admin ? (
              <>
                <Col>
                  <Button
                    type="button"
                    className={styled['button-red']}
                    onClick={() => setShowPhotoModal(true)}
                  >
                    +
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="button"
                    className={styled['button-red']}
                    onClick={() => setShowUpdateModal(true)}
                  >
                    Update
                  </Button>
                </Col>
              </>
            ) : (
              <></>
            )}
            <Col>
              <Button
                type="button"
                className={styled['button-teal']}
                onClick={() => {
                  setPhotoIndex((photoIndex + photoCount - 1) % photoCount);
                }}
              >
                &rarr;
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
      <PhotoForm
        registerId={registerId}
        artifactId={artifactId}
        showModal={showPhotoModal}
        setShowModal={setShowPhotoModal}
      />
      <UpdateArtifactForm
        registerId={registerId}
        artifactId={artifactId}
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        artifactData={artifact}
      />
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
