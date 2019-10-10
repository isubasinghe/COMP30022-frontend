import React from 'react';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import styled from './index.module.scss';
import 'react-vertical-timeline-component/style.min.css';
import { ReactComponent as TimelineIcon } from '../../assets/timeline/clock.svg';

function ArtifactTimeline(props) {
  const { artifacts } = props;
  const ordered = artifacts.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className={styled['timeline-container']}>
      <VerticalTimeline layout="1-column" className={styled['timeline-container']}>
        {ordered.map(arti => (
          <VerticalTimelineElement
            key={arti.artifact_id}
            className={styled['element']}
            contentStyle={{ borderRadius: '25px', paddingTop: '-25px', top: '-10px' }}
            contentArrowStyle={{ top: '26px' }}
            date={new Date(arti.date).getFullYear()}
            iconStyle={{ backgroundColor: '#FF6B6B' }}
            icon={<TimelineIcon />}
          >
            <Link to={`/artifact/${arti.register_id}/${arti.artifact_id}/`}>
              <h3 className={styled['title']}>{arti.name}</h3>
              <p className={styled['text']}>{arti.description}</p>
            </Link>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default ArtifactTimeline;
