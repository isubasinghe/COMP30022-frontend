import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import Spinner from '../../components/spinner';
import Error from '../../components/error';
import ArtifactTimeline from '../../components/timeline';
import authFetchRequest from '../../utils/auth/cognitoFetchRequest';

function TimelineView(props) {
  const { registerId } = props.match.params;

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
