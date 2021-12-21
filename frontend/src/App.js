import { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {Room} from "@material-ui/icons"

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
  </ReactMapGL>
  </div>
  );
}

export default App;
