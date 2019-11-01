import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import useSWR from 'swr';
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
  const { data, error } = useSWR(
    `${process.env.REACT_APP_API_ENDPOINT}/api/v1/register/all/${registerId}`,
    authFetchRequest,
    { refreshInterval: 5000 }
  );
  const artifacts = !data ? [] : Object.values(data);

  if (!data) {
    return <Spinner />;
  }
  if (error) {
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
