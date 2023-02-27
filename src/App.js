/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

export const App = () => {
  const [value, setValue] = useState('default');
  const [locations, setLocations] = useState({});
  const [open, setOpen] = useState(false);
  const [restaurant, setRestaurant] = useState({});

  const toggleOpen = (id, name) => {

    setOpen(!open);
    open ? setRestaurant({}) : setRestaurant({ id, name });
    console.log(id, name);
    console.log(restaurant)
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
          {
            Object.keys(locations).length && locations.map((place, index) => {
              return (
                <div onClick={()=>{toggleOpen(place.id,place.name)}} key={index}>
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
        <Box sx={{ width: '30vw'}}></Box>
        <Box sx={{ fontSize: 'h2.fontSize', mx: 'auto' }}>
        {restaurant.name}
        </Box>
        <Box sx={{ border: 1 }} />
        <Box sx={{mx: 'auto' }}>
          <TextField
            id="filled-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            variant="filled"
            onChange={(event) => setValue(event.target.value)}
          />
        </Box>
        <Button
          onClick={() => {
            alert(value);
          }}
        >
          POST
        </Button>
        <Box sx={{ border: 1 }} />
      </Drawer>
    </>
  )
}

export default App;
