import React from 'react';
import PropTypes from 'prop-types';
import ArtifactTimeline from '../../components/timeline';

function TimelineView({ artifacts }) {
  return <ArtifactTimeline artifacts={artifacts} />;
}
TimelineView.propTypes = {
  artifacts: PropTypes.node.isRequired
};

export default TimelineView;
