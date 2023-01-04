import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import "./App.css";

const mapStyle = {
  width: "100%",
  height: "800px",
};
const options = {
  zoomControl: true,
};
function App() {
  const [City, setCity] = useState("SALT");
  const [center, setCenter] = useState({
    lat: 32.0392,
    lng: 35.7272,
  });
  const handelSubmit = (e) => {
    e.preventDefault();

    var url = `http://api.positionstack.com/v1/forward?query=${City}&access_key=84234e0c37d3cb0dca4fd9f32a839be1`;

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);

        setCenter({
          lat: response.data.data[0].latitude,
          lng: response.data.data[0].longitude,
        });
      })

      .catch((err) => console.log(err));
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAWI9PRd9XwnMH3NG2C1bME0bl4AhgEtTY",
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <label className="label">
          Search for a city:
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            className="input"
          />
        </label>
        <button class="btn btn-dark" type="submit">
          Search
        </button>
      </form>
      <GoogleMap
        mapContainerStyle={mapStyle}
        zoom={10}
        center={center}
        options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

export default App;
