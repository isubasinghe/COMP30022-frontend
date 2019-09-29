import React from 'react';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import styled from './index.module.scss';
import 'react-vertical-timeline-component/style.min.css';
import { ReactComponent as TimelineIcon } from '../../assets/timeline/index.svg';

function ArtifactTimeline(props) {
  const { artifacts } = props;
  const ordered = artifacts.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className={styled['timeline-container']}>
      <VerticalTimeline layout="1-column">
        {ordered.map(arti => (
          <VerticalTimelineElement
            key={arti.artifact_id}
            className="vertical-timeline-element"
            date={new Date(arti.date).getFullYear()}
            iconStyle={{ background: 'rgb(0, 180, 255)' }}
            icon={<TimelineIcon />}
          >
            <Link to={`/artifact/${arti.register_id}/${arti.artifact_id}/`}>
              <h3 className="vertical-timeline-element-title">{arti.name}</h3>
              <h4 className="vertical-timeline-element-subtitle">{arti.family_members}</h4>
              <p>{arti.description}</p>
            </Link>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default ArtifactTimeline;
