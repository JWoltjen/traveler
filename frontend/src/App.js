import { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';


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
  >
    <Marker
      latitude={48.85}
      longitude={2.294694}
      offsetLeft={-20}
      offsetTop={-10}
    >
      <div>
        You are here
      </div>
    </Marker>
  </ReactMapGL>
  </div>
  );
}

export default App;
