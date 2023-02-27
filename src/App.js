import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './App.css';
 
class App extends Component {
  googleGeocoder = null;
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      center: {
        lat: 33.6537089,
        lng: 130.6722930
      },
      isShowMarker: false
    }
  }
  changeLocationName(e) {
    if (e.key === 'Enter') {
      this.geocode();
      return;
    }
    this.setState({
      locationName: e.target.value
    });
  }
  geocode() {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: this.state.locationName }, ( results, status ) => {
      if (status === 'OK') {
        let center = Object.assign({}, this.state.center);
        center = {
          lat: results[0].geometry.location.lat(), 
          lng: results[0].geometry.location.lng()
        };
        this.setState({
          center,
          isShowMarker: true
        });
      }
    });
  }
  render() {
    const labelStyle = {
      margin: '5px',
      display: 'block'
    }
    const containerStyle = {
      width: '100%',
      height: '100vh'
    };
    
    return (
      <div>
        <header>
          <h1>Iizuka Map 1</h1>
          <label style={labelStyle}>Input LocationName: <input type='text' onChange={(e) => this.changeLocationName(e)} value={this.state.locationName} onKeyPress={(e) => this.changeLocationName(e)}/></label>
        </header>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={this.state.center}
            zoom={16}
          >
            { this.state.isShowMarker && <Marker position={this.state.center} /> }
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}
 
export default App;