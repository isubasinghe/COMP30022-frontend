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

    // Default Map Position
    const { artifacts } = this.props;

    switch (artifacts.length) {
      case 0:
        this.bounds = new L.latLngBounds([[-60, -120], [60, 120]]);
        break;
      case 1:
        this.bounds = new L.latLng([artifacts[0].lat, artifacts[0].lon]).toBounds(10000);
        break;
      default:
        const markers = [];
        for (let i = 0; i < artifacts.length; i += 1) {
          markers.push(L.marker([artifacts[i].lat, artifacts[i].lon]));
        }
        this.bounds = new L.featureGroup(markers).getBounds();
    }
  }

  render() {
    const { artifacts, displayPopups, className } = this.props;
    return (
      <div>
        <Map
          className={className}
          bounds={this.bounds}
          // boundsOptions={{ padding: [10, 10] }}
        >
          <TileLayer
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {artifacts.map(arti => {
            return (
              <Marker key={arti.artifact_id} position={[arti.lat, arti.lon]}>
                {displayPopups ? (
                  <Popup className={styled['pop-up']}>
                    <Link to={`/artifact/${arti.register_id}/${arti.artifact_id}/`}>
                      <b className={styled['text-modifier']}>{arti.name}</b>
                      <br />
                      <p className={styled['text-modifier']}>{arti.description}</p>
                    </Link>
                  </Popup>
                ) : (
                  <></>
                )}
              </Marker>
            );
          })}
        </Map>
      </div>
    );
  }
}

ArtifactMap.propTypes = {
  artifacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string.isRequired,
  displayPopups: PropTypes.bool
};

ArtifactMap.defaultProps = {
  displayPopups: true
};

export default ArtifactMap;
