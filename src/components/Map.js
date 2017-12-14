/*global google*/

import React from 'react';
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import mapStyle from '../map.json';
import pin from '../images/pind2d.png';
import '../styles/Map.css';


// Saving the central point (aka City point)
const officeCoords = [
  { lat: 52.53, lng: 13.403 },
  { lat: 52.50, lng: 13.228 },
  { lat: 52.45, lng: 13.391 }
]
const officeRadius = 3500 // and the radius we want.


// Using the HOC way of setting up the Component
// It's probably reaching its limits of component size.
// So if we add more, maybe its better to create smaller ones.
const Map = withGoogleMap((props) =>
  <GoogleMap
    defaultOptions={{ styles: mapStyle }}
    defaultZoom={12}
    defaultCenter={officeCoords[0]}
    >
    { officeCoords.map(coords => (

        <Marker
          position={coords}
          icon={pin}>

         <Circle
          radius={officeRadius}
          options={{ fillColor: "#dedede", strokeColor: "#fff" }}
          center={coords}
        ></Circle>
        </Marker>
    ))}
    <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          { props.markers.map(marker => ( (marker.locations[0] && marker.locations[0].on_boundary) &&
            <Marker
              key={marker.id}
              icon={{ scale: 3, fillColor: '#333', strokeColor: '#333', strokeWeight: 5, path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, rotation: (marker.bearing) }}
              bearing={marker.bearing}
              position={{ lat: marker.locations[0] && marker.locations[0].lat, lng: marker.locations[0] && marker.locations[0].lng }}
            >
            </Marker>
          ))}
        </MarkerClusterer>
  </GoogleMap>
)

export default Map;


// This is optional and I find it useful,
// but too many lines are on the vision.
// We can include it inside the Marker component

// { marker.locations[0] &&
//   <Polyline path={marker.locations}
//             offset="100%"
//             options={{ strokeColor: "#000", fillOpacity: '0.3', fillColor: "#000" }}/> }
