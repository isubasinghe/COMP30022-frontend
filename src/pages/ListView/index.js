import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import Spinner from '../../components/spinner';
import Error from '../../components/error';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import styled from './index.module.scss';

function ListView(props) {
  const { registerId } = props.match.params;

  const { data, error } = useSWR(
    `${process.env.REACT_APP_API_ENDPOINT}/api/v1/register/all/${registerId}`,
    authFetchRequest,
    { refreshInterval: 5000 }
  );

  const artifacts = !data
    ? []
    : Object.values(data).sort((a, b) => {
        const { name: aName } = a;
        const { name: bName } = b;
        return aName.toUpperCase().localeCompare(bName.toUpperCase());
      });

  if (!data) {
    return <Spinner />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <>
      <div className={styled['list-container']}>
        {artifacts && artifacts.length === 0 ? (
          <p className={styled['oops-text']}>
            Oops! It looks like there's no artifacts in this register!
          </p>
        ) : (
          artifacts.map(artifact => (
            <Link
              key={`link-${artifact.artifact_id}`}
              to={`/artifact/${registerId}/${artifact.artifact_id}/`}
            >
              <div
                key={artifact.artifact_id}
                id={`artifact-${artifact.artifact_id}`}
                className={styled['item-container']}
              >
                {artifact.name}{' '}
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}

ListView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      registerId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default ListView;
