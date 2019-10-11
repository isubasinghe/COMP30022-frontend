import React, { useState, useEffect } from 'react';
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

// Reload Map Marker Global
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});

const MAP_URL = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTION = '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors';

const ArtifactMap = ({ className, artifacts, displayPopups, movable: { setPos, getPos } }) => {
  const [bounds, setBounds] = useState(new L.latLngBounds([[-60, -120], [60, 120]]));
  const movable = !!setPos;

  useEffect(() => {
    switch (artifacts.length) {
      case 0:
        setBounds(new L.latLngBounds([[-60, -120], [60, 120]]));
        break;
      case 1:
        setBounds(new L.latLng([artifacts[0].lat, artifacts[0].lon]).toBounds(1500000));
        break;
      default:
        setBounds(
          new L.featureGroup(
            artifacts.map(({ lat, lon }) => {
              return L.marker([lat, lon]);
            })
          ).getBounds()
        );
    }
  }, [artifacts]);

  return movable ? (
    <Map className={className} center={[0.0, 0.0]} zoom={0}>
      <TileLayer url={MAP_URL} attribution={MAP_ATTRIBUTION} />
      <Marker
        position={getPos()}
        draggable="true"
        onDragend={({ target }) => {
          const { lat, lng } = target.getLatLng();
          setPos(lat, lng);
        }}
      />
    </Map>
  ) : (
    <Map className={className} bounds={bounds} boundsOptions={{ padding: [10, 10] }}>
      <TileLayer url={MAP_URL} attribution={MAP_ATTRIBUTION} />
      {artifacts.map(({ artifact_id, register_id, lat, lon, name, description }) => {
        return (
          <Marker key={artifact_id} position={[lat, lon]}>
            {displayPopups ? (
              <Popup className={styled['pop-up']}>
                <Link to={`/artifact/${register_id}/${artifact_id}/`}>
                  <b className={styled['text-modifier']}>{name}</b>
                  <br />
                  <p className={styled['text-modifier']}>{description}</p>
                </Link>
              </Popup>
            ) : (
              <></>
            )}
          </Marker>
        );
      })}
    </Map>
  );
};

ArtifactMap.propTypes = {
  className: PropTypes.string.isRequired,
  artifacts: PropTypes.arrayOf(
    PropTypes.shape({
      artifact_id: PropTypes.number.isRequired,
      register_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      lat: PropTypes.string.isRequired,
      lon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ),
  displayPopups: PropTypes.bool,
  movable: PropTypes.shape({
    setPos: PropTypes.func,
    getPos: PropTypes.func
  })
};

ArtifactMap.defaultProps = {
  artifacts: [],
  displayPopups: true,
  movable: {
    setPos: null,
    getPos: null
  }
};

export default ArtifactMap;
