/*global google*/

import React, { Component } from 'react';
import axios from 'axios';

import Sidebar from './components/Sidebar';
import Map from './components/Map';
import './styles/App.css';

class App extends Component {


  // Initializing our Component with Default data
  // Otherwise we get Undefineds
  constructor(props) {
    super(props)
    // this.endpoint = 'https://door2door-vehicles.herokuapp.com/vehicles'
    this.endpoint = 'https://door2door-vehicles.herokuapp.com'
    this.state = { markers: [], filteredMarkers: [] }
  }


  // This is the simplest solution for the problem:
  // Each request is 2~5kb in size, which is not too much performant
  // in the long run.
  // But it's fast enough to handle it with no problems
  updateRetrieval() {
    this.interval = setInterval(this.retrieveVehicles.bind(this), 3000)
  }


  // We use the computeHeading method from Google Maps to Calculate the
  // heading based on the 1-3 points we have.
  // We also use this to rotate the navigation icon (be it a car or something like it)
  calculateBearings(location) {
    if (location[0] && location[1] &&
      typeof(location[0].lat) !== 'undefined') {

        var from = new google.maps.LatLng(location[0].lat, location[0].lng);
        var to = new google.maps.LatLng(location[3].lat, location[3].lng);

        return google.maps.geometry.spherical.computeHeading(from, to)
      }
    }



    // I tried fetch, but AXIOS felt better
    // And for some reason, Fetch is always triggering
    // CORS errors even with Cross-origin allowed for every resource


    // This method fetches the API
    // And save the markers in the current state
    // We also filter those that are on boundary or not
    // Which we could have done here, but Node.
    retrieveVehicles() {

      axios.get(this.endpoint)
      .then(response => {
        let markers = response.data;

        markers.map(marker => {
          marker.bearing = this.calculateBearings(marker.locations)
          return marker;
        })

        this.setState({ markers: markers });
        this.setState({ filteredMarkers: markers.filter(marker => marker.locations[0].on_boundary )})
      }).catch(err => {
        console.log(err);
      })
    }


    // We didnt get to use This
    // But, good practices if we develop further
    componentWillUnmount() {
      clearInterval(this.interval);
    }


    // We only fetch when the component is ready.
    componentDidMount() {
      this.retrieveVehicles()
      this.updateRetrieval()
    }

    // The APP component itself.
    render() {
      return (
        <div className="content">
        <Map
        isMarkerShown={true}
        markers={ this.state.markers }
        loadingElement={<div className="map"/>}
        containerElement={<div style={{ height: `100vh`, width: `80%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        />
        <Sidebar markers={this.state.markers} filteredMarkers={this.state.filteredMarkers}/>
        </div>
      );
    }
  }

  export default App;
