import React from 'react';
import PropTypes from 'prop-types';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { ReactComponent as TimelineIcon } from '../../assets/timeline/index.svg';

function ArtifactTimeline({ artifacts }) {
  return (
    <body bgcolor="f0f0f0">
      <VerticalTimeline layout="2-columns">
        {artifacts.map(arti => (
          <VerticalTimelineElement
            className="vertical-timeline-element"
            date={arti.date}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
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
