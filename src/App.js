/*global google*/

import React, { Component } from 'react';
import Map from './components/Map';
import axios from 'axios';
import logo from './d2d.svg';
import Moment from 'react-moment';
import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props)
    // this.endpoint = 'https://door2door-vehicles.herokuapp.com/vehicles'
    this.endpoint = 'http://localhost:3000/vehicles'
    this.state = { markers: [], filteredMarkers: [] }
  }

  updateRetrieval() {
    this.interval = setInterval(this.retrieveVehicles.bind(this), 3000)
  }


  calculateBearings(location) {
    if (location[0] && location[1] &&
      typeof(location[0].lat) !== 'undefined') {

        var from = new google.maps.LatLng(location[0].lat, location[0].lng);
        var to = new google.maps.LatLng(location[1].lat, location[1].lng);

        return google.maps.geometry.spherical.computeHeading(from, to)
      }
    }

    retrieveVehicles() {

      axios.get(this.endpoint)
      .then(response => {
        let markers = response.data;

        markers.map(marker => {
          marker.bearing = this.calculateBearings(marker.locations)
          return marker;
        })

        this.setState({ markers: markers });
        this.setState({ filteredMarkers: markers.filter(marker => marker.locations[0] )})
      }).catch(err => {
        console.log(err);
      })
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    componentDidMount() {
      this.retrieveVehicles()
      this.updateRetrieval()
    }


    render() {
      return (
        <div className="content">
          <Map
          markers={ this.state.markers }
          loadingElement={<div className="map"/>}
          containerElement={<div style={{ height: `100vh`, width: `80%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          />
          <div className="sidebar">
            <div className="logo"><img src={logo} alt="Door2Door.io"/></div>
            <h2 className="has-text-centered has-text-weight-bold is-size-5">
              { this.state.filteredMarkers.length } Active Vehicles
            </h2>
            <ul>
            { this.state.filteredMarkers.map( marker => (
              <li key={marker.id}>
              <h5 className="is-size-6 has-text-weight-bold">{ marker.id }</h5>
              <em>Last seen &nbsp;
                <Moment fromNow>{ marker.locations[0] && marker.locations[0].at }</Moment>
              </em>
              </li>
            ))}
            </ul>
          </div>
        </div>
      );
    }
  }

  export default App;
