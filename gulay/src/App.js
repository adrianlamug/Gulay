import React, {useState} from "react";
import './App.css';
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import * as corkData from "./data/cork-cafes.json";
import InstagramEmbed from 'react-instagram-embed';

function App() {
  const[viewport, setViewport] = useState({
    latitude: 51.8985, 
    longitude: -8.4756,
    width: '100vw',
    height: '100vh',
    zoom: 10
  });
  const [selectedPlace, setSelectedPlace] = useState(null)

  // Instagram GET Request
  
  
  return <div>
    <ReactMapGL {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    mapStyle="mapbox://styles/adrianlamug/ckm30m1h7938y17ryqcabsb49"
    onViewportChange={ viewport => 
      {setViewport(viewport)
    }}>
      {corkData.features.map((cafe) => (
          <Marker key={cafe.properties.cafe_id} latitude={cafe.geometry.coordinates[1]} longitude={cafe.geometry.coordinates[0]}>
            <button class="cafeButton" onClick={(e) => {
              e.preventDefault();
              setSelectedPlace(cafe)
            }}>
              <img src="/plant.png" alt="leaf icon"/>
            </button>
          </Marker>
      ))}
      {selectedPlace ? (
        <Popup 
        latitude={selectedPlace.geometry.coordinates[1]} 
        longitude={selectedPlace.geometry.coordinates[0]}
        anchor="right"
        onClose={() => {
          setSelectedPlace(null)
        }}>
          <div>
            <h3>{selectedPlace.properties.title}</h3>
            
            <InstagramEmbed
            url={selectedPlace.properties.instagram}
            clientAccessToken={process.env.REACT_APP_INSTAGRAM_TOKEN}
            maxWidth={160}
            hideCaption={true}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
            />
          </div>
        </Popup>
      ) : null}
    </ReactMapGL>
    </div>;
}

export default App;
