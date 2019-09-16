import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
    return <div className="loading">Loading your request</div>;
  }
  if (errorState) {
    return <div className="error">Something went wrong with your request, woops</div>;
  }
  return <ArtifactTimeline artifacts={artifacts} />;
}
TimelineView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      registerId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
export default TimelineView;
