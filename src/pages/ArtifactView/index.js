/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Spinner from '../../components/spinner';
import PhotoForm from '../../components/photoform';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import styled from './index.module.scss';

function ArtifactView(props) {
  const [artifact, setArtifact] = useState(undefined);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoCount, setPhotoCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  if (!hasLoaded) {
    return <Spinner />;
  }
  if (errorState) {
    return <div className="error">Something went wrong with your request, woops</div>;
  }

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
              className={styled['button-teal']}
              onClick={() => setPhotoIndex((photoIndex + 1) % photoCount)}
            >
              &larr;
            </button>
            {artifact.is_admin ? (
              <button type="button" className={styled['button-red']} onClick={() => setShowModal(true)}>
                +
              </button>
            ) : (
              <></>
            )}
            <button
              type="button"
              className={styled['button-teal']}
              onClick={() => {
                setPhotoIndex((photoIndex + photoCount - 1) % photoCount);
              }}
            >
              &rarr;
            </button>
          </div>
          <div className={styled['column']}>
            {[
              { title: 'Location', data: `${artifact.lat}, ${artifact.lon}` },
              { title: 'Date', data: moment(artifact.date).format('dddd, MMMM Do YYYY') },
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
      <PhotoForm
        registerId={registerId}
        artifactId={artifactId}
        showModal={showModal}
        setShowModal={setShowModal}
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
