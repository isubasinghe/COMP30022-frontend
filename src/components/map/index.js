import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import styled from './index.module.scss';
import './index.scss';

// Reload Map Marker
// TODO: Customize
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});

class ArtifactMap extends React.Component {
  constructor(props) {
    super(props);

    // Default Map Position and Zoom
    this.state = {
      lat: 0.0,
      lon: 0.0,
      zoom: 2
    };
  }

  render() {
    const { artifacts } = this.props;
    const { lat, lon, zoom } = this.state;
    return (
      <Map center={{ lat, lon }} zoom={zoom} className={styled['map-component']}>
        <TileLayer
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {artifacts.map(arti => {
          return (
            <Marker key={arti.artifact_id} position={[arti.lat, arti.lon]}>
              <Popup className={styled['pop-up']}>
                <Link to={`/artifact/${arti.register_id}/${arti.artifact_id}/`}>
                  <b className={styled['text-modifier']}>{arti.name}</b>
                  <br />
                  <p className={styled['text-modifier']}>{arti.description}</p>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>
    );
  }
}

ArtifactMap.propTypes = {
  artifacts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ArtifactMap;
