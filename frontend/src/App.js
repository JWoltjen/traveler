import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { Room, Star } from "@material-ui/icons"
import "./app.css"
import axios from 'axios';

function App() {
  const [pins, setPins] = useState([])
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude:  46,
    longitude: 17,
    zoom: 8, 
  });

  useEffect(()=>{
    const getPins = async () => {
      try{
        const allPins = await axios.get("/pins"); 
        setPins(allPins.data); 
        console.log(allPins.data)
      }catch(err){
        console.log(err)
      }
    }; 
    getPins()
  }, [])

  
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/jwoltjen/ckxglnm0n07ay14o9sc1vie84"
      >
      {pins.map(p => (
      <>
        <Marker
          longitude={p.long}
          latitude={p.lat}
          offsetLeft={-3.5 * viewport.zoom}
          offsetTop={-7 * viewport.zoom}
        >
          <Room style={{fontSize: viewport.zoom * 7, color:"slateblue"}}/>
        </Marker>
        <Popup
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              anchor="left" >
              <div className="card">
                <label>Place</label>
                <h4 className='place'>{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  <Star className="star"/>
                  <Star className="star"/>
                  <Star className="star"/>
                  <Star className="star"/>
                </div>
                  <label>Information</label>
                  <span className="username">Created by <b>{p.user}</b></span>
                  <span className="date">1 hour ago</span>
              </div>
          </Popup>
        </>
      ))}
    </ReactMapGL>
  </div>
  );
}

export default App;


          