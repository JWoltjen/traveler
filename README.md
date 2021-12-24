# traveler
A MERN application that allows users to pin travel destinations and leave reviews

## packages used

  1. ReactMapGL
  2. Mongoose
  4. Timeago.js
  

## how does the application handle creating new pins? 
  
 The application relies on two components from ReactMapGL, Marker and Popup. Marker is used to display custom icons on the map overlay. Similarly, Popup displays a card on the map overlay which is useful for entering information. Marker also relies on the useState hook for viewPort and setViewPort,  so that whenever a new Marker or Popup needs to be displayed, we use the spread operator to carry the value of the memory stored in viewport and pass on new values based on the latitude and longitude, and id of the mouse click:
 
 1. Adding the new information to useState
 
        const handleAddClick = (e) => {
          const [lng, lat] = e.lngLat
          setNewPlacee({
            lat: lat, 
            lng: lng,
          })
         }
 
 2. Centering the viewport
  
        const handleMarkerClick = (id, lat, long) => {
          setCurrentPlace(id)
          setViewPort({...viewport, latitude: lat, longitude: long})
        }
  
 3. Adding the values
 
        const handleSubmit = async (e) => {
          e.preventDefault();
          const newPin = {
            username: currentUser, 
            title,
            desc,
            rating,
            lat: newPlace.lat, 
            long: newPlace.lng
        }
  
 3.5. Ship it off to the database (same lexical scope/function as above)
 
         try {
              const res = await axios.post("/pins", newPin)
              setPins([...pins, res.data])
              setNewPlace(null)
            } catch (err) {
              console.log(err)
            }
          }

        
