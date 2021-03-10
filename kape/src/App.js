import React, {useState} from "react";
import './App.css';
import ReactMapGL, {Marker} from "react-map-gl";
import * as corkData from "./data/cork-cafes.json";

function App() {
  const[viewport, setViewport] = useState({
    latitude: 51.8985, 
    longitude: -8.4756,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })
  return <div>
    <ReactMapGL {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    mapStyle="mapbox://styles/adrianlamug/ckm30m1h7938y17ryqcabsb49"
    onViewportChange={ viewport => 
      {setViewport(viewport)
    }}>
      {corkData.features.map((cafe) => (
          <Marker key={cafe.properties.cafe_id} latitude={cafe.geometry.coordinates[1]} longitude={cafe.geometry.coordinates[0]}>
            <button class="cafeButton">
              <img src="/coffee.png" alt="cafe icon"/>
            </button>
          </Marker>
      ))}
    </ReactMapGL>
    </div>;
}

export default App;
