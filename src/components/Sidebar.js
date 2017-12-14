import React, { Component } from 'react';
import Moment from 'react-moment';
import logo from '../images/d2d.svg';
import '../styles/Sidebar.css';




// Showing filtered + normal markers
// On a nice sidebar
class Sidebar extends Component {
  render() {
    return(
      <div className="sidebar">
        <div className="logo"><img src={logo} alt="Door2Door.io"/></div>
        <h2 className="has-text-centered has-text-weight-bold is-size-5">
          { this.props.filteredMarkers.length } Vehicles in Coord radius
        </h2>
        <h4 className="has-text-centered has-text-weight-bold is-size-7">
          { this.props.markers.length } active Vehicles in total
        </h4>
        <ul>
        { this.props.filteredMarkers.map( marker => (
          <li key={marker.id}>
          <h5 className="is-size-6 has-text-weight-bold">{ marker.id }</h5>
          <em>Last seen &nbsp;
            <Moment fromNow>{ marker.locations[0] && marker.locations[0].at }</Moment>
          </em>
          </li>
        ))}
        </ul>
      </div>
    )
  }
}


export default Sidebar;
