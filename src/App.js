import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';

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

// おすすめの飲食店(place))の配列
// TODO データベースから取得する
const locations = [
    {
        name: "本場インド料理 ルパ",
        location: {
          lat: 33.652219,
          lng: 130.6794,
        },
    },
    {
        name: "麺屋 すみ岡",
        location: {
          lat: 33.6504,
          lng: 130.6694,
        },
    },
];

export const App = () => {
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
        {
          locations.map((place, index) => {
            return (
              <div onClick={()=>{logPlace(place.name)}} key={index}>
                <InfoWindow position={place.location}>
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
  )
}

export default App;
