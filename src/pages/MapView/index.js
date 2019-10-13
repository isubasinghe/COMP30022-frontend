import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import Spinner from '../../components/spinner';
import Error from '../../components/error';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import styled from './index.module.scss';

const ArtifactMap = Loadable({
  loader: () => import('../../components/map'),
  loading: Spinner
});

function MapView({
  match: {
    params: { registerId }
  }
}) {
  const [artifacts, setArtifacts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errorState, setErrorState] = useState(false);
  // TODO: write a hook to replicate useEffect authenticated fetch
  useEffect(() => {
    if (registerId !== null) {
      authFetchRequest(`https://api.airloom.xyz/api/v1/register/all/${registerId}`, {})
        .then(data => {
          const mapData = Object.values(data);
          setArtifacts(mapData);
          setHasLoaded(true);
        })
        .catch(() => {
          setErrorState(true);
          setHasLoaded(true);
        });
    }
  }, [registerId]);
  if (!hasLoaded) {
    return <Spinner />;
  }
  if (errorState) {
    return <Error />;
  }
  return <ArtifactMap className={styled['map-component']} artifacts={artifacts} />;
}

MapView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      registerId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default MapView;
