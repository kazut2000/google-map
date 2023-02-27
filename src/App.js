import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 35.69575,
  lng: 139.77521,
};

const positionAkiba = {
  lat: 35.69731,
  lng: 139.7747,
};

const positionIwamotocho = {
  lat: 35.69397,
  lng: 139.7762,
};

const divStyle = {
  background: "white",
  fontSize: 7.5,
};

function huga() {
  console.log("huga");
}


export const App = () => {
  console.log("hoge");
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <div onClick={huga}>
          <InfoWindow position={positionAkiba}>
          <div style={divStyle}>
            <h1>秋葉原オフィス</h1>
          </div>
          </InfoWindow>
        </div>

        <>
          <InfoWindow position={positionIwamotocho}>
          <div style={divStyle}>
            <h1>岩本町オフィス</h1>
          </div>
        </InfoWindow>
        </>
      </GoogleMap>
    </LoadScript>
  )
}

export default App;
