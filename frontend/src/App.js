import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { Room, Star } from "@material-ui/icons"
import "./app.css"
import axios from 'axios';
import { format } from "timeago.js"

function App() {
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude:  48,
    longitude: 2,
    zoom: 9, 
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

  const handleMarkerClick = (id) =>{
    setCurrentPlaceId(id)
  }

  
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
          <Room style={{fontSize: viewport.zoom * 7, color:"slateblue"}}
          onClick={()=>handleMarkerClick(p._id)}
          />
        </Marker>
        {p._id === currentPlaceId && (
        <Popup
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              anchor="left" 
              onClose={()=>setCurrentPlaceId(null)}
        >
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
                  <span className="username">Created by <b>{p.username}</b></span>
                  <span className="date">{format(p.createdAt)}</span>
              </div>
          </Popup>
        )}
        </>
      ))}
    </ReactMapGL>
  </div>
  );
}

export default App;


          