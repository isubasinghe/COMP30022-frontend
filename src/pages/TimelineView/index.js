import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../components/spinner';
import Error from '../../components/error';
import ArtifactTimeline from '../../components/timeline';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';

function TimelineView(props) {
  const [artifacts, setArtifacts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const { registerId } = props.match.params;
  useEffect(() => {
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
  }, [registerId]);
  if (!hasLoaded) {
    return <Spinner />;
  }
  if (errorState) {
    return <Error />;
  }
  return (
    <>
      <ArtifactTimeline artifacts={artifacts} />
    </>
  );
}
TimelineView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      registerId: PropTypes.string
    }).isRequired
  }).isRequired
};
export default TimelineView;
