import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Reload Map Marker
// TODO: Customize
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
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
    const artifacts = this.props.artifacts;
    const mapPosition = [this.state.lat, this.state.lon];
    return (
      <Map center={mapPosition} zoom={this.state.zoom} style={{ width: '75%', height: '600px' }}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {artifacts.map(arti => (
          <Marker position={[arti.lat, arti.lon]}>
            <Popup>
              <span>
                <b>{arti.name}</b>
                <br />
                {arti.description}
              </span>
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}
ArtifactMap.propTypes = {
  artifacts: PropTypes.node.isRequired
};

export default ArtifactMap;
