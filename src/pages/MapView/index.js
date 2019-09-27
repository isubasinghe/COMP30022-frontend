import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ArtifactMap from '../../components/map';
import Spinner from '../../components/spinner';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import styled from './index.module.scss';

function MapView(props) {
  const [artifacts, setArtifacts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const { registerId } = props.match.params;
  // TODO: write a hook to replicate useEffect authenticated fetch
  useEffect(() => {
    if (registerId !== null) {
      authFetchRequest(`https://api.airloom.xyz/api/v1/register/all/${registerId}`, {})
        .then(data => {
          const mapData = Object.values(data);
          for (let i = 0; i < mapData.length; i++) {
            mapData[i].lat = parseFloat(mapData[i].lat);
            mapData[i].lon = parseFloat(mapData[i].lon);
          }
          setArtifacts(mapData);
          setHasLoaded(true);
        })
        .catch(err => {
          setErrorState(true);
          setHasLoaded(true);
        });
    }
  }, [registerId]);
  if (!hasLoaded) {
    return <Spinner />;
  }
  if (errorState) {
    return <div className="error">Something went wrong with your request, woops</div>;
  }
  return (
    <>
      <ArtifactMap className={styled['artifact-map']} artifacts={artifacts} />
    </>
  );
}

MapView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      registerId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default MapView;
