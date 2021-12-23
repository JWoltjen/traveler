import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { Room, Star } from "@material-ui/icons"
import "./app.css"
import axios from 'axios';
import { format } from "timeago.js"

function App() {
  const currentUser = "john"
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
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

  const handleMarkerClick = (id, lat, long) =>{
    setCurrentPlaceId(id)
    setViewport({...viewport, latitude: lat, longitude: long })
  }

  const handleAddClick = (e) => {
    const [lng,lat] = e.lngLat; 
    setNewPlace({
      lat: lat,
      lng: lng,
    })
    console.log(newPlace)
  }
  
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/jwoltjen/ckxglnm0n07ay14o9sc1vie84"
        onDblClick = {handleAddClick}
        transitionDuration="500"
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
          onClick={()=>handleMarkerClick(p._id, p.lat, p.long)}
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
      {newPlace && (
       <Popup
          latitude={newPlace.lat}
          longitude={newPlace.lng}
          closeButton={true}
          closeOnClick={false}
          anchor="left" 
          onClose={()=>setNewPlace(null)}
        >
          <div>
            <form>
              <label>Title</label>
              <input placeholder="enter a title"/>
              <label>Review</label>
              <textarea placeholder="tell us about this place"/>
              <label>Rating</label>
              <select>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              <button className="submitButton" type="submit">Add Pin</button>
            </form>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  </div>
  );
}

export default App;


          