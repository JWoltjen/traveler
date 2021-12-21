import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { Room, Star } from "@material-ui/icons"

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 48.85,
    longitude: 2.294694,
    zoom: 8
  });
  return (
    <div className="App">
    <ReactMapGL
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
    onViewportChange={nextViewport => setViewport(nextViewport)}
    mapStyle="mapbox://styles/jwoltjen/ckxglnm0n07ay14o9sc1vie84"
  >
    <Marker
      latitude={48.85}
      longitude={2.294694}
      offsetLeft={-20}
      offsetTop={-10}
    >
      <Room style={{fontSize: viewport.zoom * 7, color:"slateblue"}}/>
    </Marker>
    <Popup
          latitude={48.85}
          longitude={2.294694}
          closeButton={true}
          closeOnClick={false}
          anchor="left" >
          <div className="card">
            <label>Place</label>
            <h4>Eiffel Tower</h4>
            <label>Review</label>
            <p>Beautiful Place!</p>
            <label>Rating</label>
            <div className="stars">
              <Star/>
              <Star/>
              <Star/>
              <Star/>
              <Star/>
            </div>
           
            <label>Information</label>
          </div>
        </Popup>
  </ReactMapGL>
  </div>
  );
}

export default App;
