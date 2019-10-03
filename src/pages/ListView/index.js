import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../components/spinner';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';
import styled from './index.module.scss';

function ListView(props) {
  const [artifacts, setArtifacts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const { registerId } = props.match.params;
  // TODO: write a hook to replicate useEffect authenticated fetch
  useEffect(() => {
    if (registerId !== null) {
      authFetchRequest(`https://api.airloom.xyz/api/v1/register/all/${registerId}`, {})
        .then(data => {
          const artifactData = Object.values(data);
          setArtifacts(artifactData);
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
      <div className={styled['list-container']}>
        {artifacts && artifacts.length === 0 ? (
          <p className={styled['oops-text']}>
            Oops! It looks like there's no artifacts in this register!
          </p>
        ) : (
          artifacts.map(artifact => (
            <div id={`artifact-${artifact.artifact_id}`} className={styled['item-container']}>
              <Link
                className={styled['link-text']}
                to={`/artifact/${registerId}/${artifact.artifact_id}/`}
              >
                {artifact.name}
              </Link>
            </div>
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
