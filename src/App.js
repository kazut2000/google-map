/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/system/Box';

// Mapの画面サイズを全画面に設定
const containerStyle = {
  width: '100%',
  height: '100vh'
};

// Mapの中心を九州工業大学に設定
const center = {
  lat: 33.6537,
  lng: 130.6722,
};

// InfoWindowのスタイルの設定
const divStyle = {
  background: "white",
  fontSize: 7.5,
};

// InfoWindowをクリックした時の処理
// TODO 関数名は処理によって変更する
function logPlace(name) {
  console.log(name);
}

export const App = () => {
  const [locations, setLocations] = useState({});
  const [open, setopen] = useState(false);

  const toggleOpen = () => {
    setopen(!open);
  }

  // DBからlocationを取得する関数
  const getApiData = async () => {
    const response = await fetch(
      "https://real-hound-51.hasura.app/api/rest/location",
      {
        headers: {
          'Content-Type': 'application/json',
          "x-hasura-admin-secret" : `${process.env.REACT_APP_ID_TOKEN}`
        },
      }
    ).then((response) => response.json());
    setLocations(response.locations);
  };

  useEffect(() => {
    getApiData()
  }, [])

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          { /* Child components, such as markers, info windows, etc. */}
          {
            Object.keys(locations).length && locations.map((place, index) => {
              return (
                <div onClick={toggleOpen} key={index}>
                  <InfoWindow position={{lat: Number(place.lat_location), lng: Number(place.lng_location)}}>
                    <div style={divStyle}>
                      <h1>{place.name}</h1>
                    </div>
                  </InfoWindow>
                </div>
              )
            })
          }
        </GoogleMap>
      </LoadScript>

      <Drawer anchor='left' open={open} onClose={toggleOpen}>
        <Box sx={{ width: '30vw' }}>
          <p>hello</p>
        </Box>
      </Drawer>
    </>
  )
}

export default App;
