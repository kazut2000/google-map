/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
import { Button, TextField, Box, Drawer } from "@mui/material";

// Mapの画面サイズを全画面に設定
const containerStyle = {
  width: "100%",
  height: "100vh",
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
  const [value, setValue] = useState("");
  const [locations, setLocations] = useState({});
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [rsreviews, setRsreviews] = useState({});

  //左のサイドバーを開く
  const toggleOpenLeft = (id, name) => {
    setOpenLeft(!openLeft);
    openLeft ? setRestaurant({}) : setRestaurant({ id, name });
    if (!openLeft) {
      getRsreview(id);
    }
  };

  //右のサイドバーを開く
  const toggleOpenRight = () => {
    setOpenRight(!openRight);
  };

  // APIからlocationを取得する関数
  const getLocation = async () => {
    const response = await fetch(
      "https://real-hound-51.hasura.app/api/rest/location",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": `${process.env.REACT_APP_ID_TOKEN}`,
        },
      }
    ).then((response) => response.json());
    setLocations(response.locations);
  };

  // APIからrereviewを取得する関数
  const getRsreview = async (locations_id) => {
    const response = await fetch(
      `https://real-hound-51.hasura.app/api/rest/rsreview?_eq=${locations_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": `${process.env.REACT_APP_ID_TOKEN}`,
        },
      }
    ).then((response) => response.json());
    setRsreviews(response.rsreview);
  };

  // APIにrereviewを登録する関数
  const postRsreview = async (comment, locations_id) => {
    const response = await fetch(
      `https://real-hound-51.hasura.app/api/rest/rsreview?comment=${comment}&locations_id=${locations_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": `${process.env.REACT_APP_ID_TOKEN}`,
        },
      }
    ).then((response) => response.json());
    toggleOpenLeft();
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            {Object.keys(locations).length &&
              locations.map((place, index) => {
                return (
                  <div
                    onClick={() => {
                      toggleOpenLeft(place.id, place.name);
                    }}
                    key={index}
                  >
                    <InfoWindow
                      position={{
                        lat: Number(place.lat_location),
                        lng: Number(place.lng_location),
                      }}
                    >
                      <div style={divStyle}>
                        <h1>{place.name}</h1>
                      </div>
                    </InfoWindow>
                  </div>
                );
              })}
          </GoogleMap>
        </LoadScript>
        <Button
          sx={{
            position: "absolute",
            right: 0,
            top: 50,
          }}
          variant="contained"
          onClick={toggleOpenRight}
        >
          場所を追加
        </Button>
      </Box>

      <Drawer anchor="left" open={openLeft} onClose={toggleOpenLeft}>
        <Box sx={{ width: "30vw" }}></Box>
        <Box sx={{ fontSize: "h.fontSize", mx: "auto" }}>{restaurant.name}</Box>
        <Box sx={{ border: 1 }} />
        <Box sx={{ mx: "auto" }}>
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
            postRsreview(value, restaurant.id);
          }}
        >
          POST
        </Button>
        <Box sx={{ border: 1 }} />
        {Object.keys(rsreviews).length &&
          rsreviews.map((reviews, index) => {
            return (
              <div key={index}>
                <Box sx={{ p: 2, border: "1px dashed grey" }}>
                  {reviews.comment}
                </Box>
              </div>
            );
          })}
      </Drawer>

      <Drawer anchor="right" open={openRight} onClose={toggleOpenRight}>
        <p>店の名前</p>
        <Box sx={{ width: "20vw" }}></Box>
        <Box sx={{ mx: "auto" }}>
          <TextField
            id="filled-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            variant="filled"
            onChange={(event) => setValue(event.target.value)}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default App;
