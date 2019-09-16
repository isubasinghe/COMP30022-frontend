import React from 'react';
import PropTypes from 'prop-types';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { ReactComponent as TimelineIcon } from '../../assets/timeline/index.svg';

function ArtifactTimeline(props) {
  const { artifacts } = props;
  const ordered = artifacts.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <body bgcolor="f0f0f0">
      <VerticalTimeline layout="1-column">
        {ordered.map(arti => (
          <VerticalTimelineElement
            className="vertical-timeline-element"
            date={new Date(arti.date).getFullYear()}
            iconStyle={{ background: 'rgb(0, 180, 255)' }}
            icon={<TimelineIcon />}
          >
            <h3 className="vertical-timeline-element-title">{arti.name}</h3>
            <h4 className="vertical-timeline-element-subtitle">{arti.family_members}</h4>
            <p>{arti.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </body>
  );
}
ArtifactTimeline.propTypes = {
  artifacts: PropTypes.node.isRequired
};

export default ArtifactTimeline;
