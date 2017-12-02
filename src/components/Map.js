/*global google*/

import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import '../styles/Map.css';


const Map = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 52.53, lng: 13.403 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}

    <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          { props.markers.map(marker => ( marker.locations[0] &&
            <Marker
              key={marker.id}
              defaultIcon={{ scale: 4, strokeWeight: 8, path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, rotation: (marker.bearing - 180) }}
              bearing={marker.bearing}
              position={{ lat: marker.locations[0] && marker.locations[0].lat, lng: marker.locations[0] && marker.locations[0].lng }}
            />
          ))}
        </MarkerClusterer>
  </GoogleMap>
)

export default Map;
