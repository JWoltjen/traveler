# traveler
A MERN application that allows users to pin travel destinations and leave reviews

## packages used

  1. ReactMapGL
  2. Mongoose
  4. Timeago.js
  

## how does the application handle creating new pins? 
  
The application relies on two components from ReactMapGL, Marker and Popup. Marker is used to display custom icons on the map overlay. Similarly, Popup displays a card on the map overlay which is useful for entering information. Marker also relies on the useState hook for viewPort and setViewPort,  so that whenever a new Marker or Popup needs to be displayed, we use the spread operator to carry the value of the memory stored in viewport and pass on new values based on the latitude and longitude, and id of the mouse click:
 
 1. Adding the new information into state:
 
        const handleAddClick = (e) => {
          const [lng, lat] = e.lngLat
          setNewPlace({
            lat: lat, 
            lng: lng,
          })
         }
 
 2. Centering the viewport:
  
        const handleMarkerClick = (id, lat, long) => {
          setCurrentPlace(id)
          setViewPort({...viewport, latitude: lat, longitude: long})
        }
  
 3. Adding the values to state:
 
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

 ## how does the application handle user login/logout? 
 
 There are three main aspects of this application's login/logout feature. First is the conditional logic that is used to display the login/logout/register buttons. This is handled writing a common conditional pattern for React which uses the ternary operator. This code says if there's a current user, display the logout button, if there is no current user, display login or register buttons instead: 
 
 1. Conditionally Render appropriate buttons based on state:

         {currentUser ? ( <button className="button logout" onClick={handleLogout}>Log out</button>
      ) : (
        <div className="buttons">
          <button className="button login" onClick={()=>setShowLogin(true)}>Login</button>
          <button className="button register" onClick={()=>setShowRegister(true)}>Register</button>
        </div>
      )}
      
2. Display Either Register or Login Component if user clicks Login or Register Buttons:


3. Handle successful/unsuccessful login or register attempt

