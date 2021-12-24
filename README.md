# traveler
A MERN application that allows users to pin travel destinations and leave reviews

## packages used

  1. ReactMapGL
  2. Mongoose
  4. Timeago.js
  

## how does the application handle creating new pins? 
  
 The application relies on two components from ReactMapGL, Marker and Popup. Marker is used to display custom icons on the map overlay. Similarly, Popup displays a card on the map overlay which is useful for entering information. Marker also relies on the useState hook for viewPort and setViewPort,  so that whenever a new Marker or Popup needs to be displayed, we use the spread operator to carry the value of the memory stored in viewport and pass on new values based on the latitude and longitude, and id of the mouse click: 
  
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlace(id)
    setViewPort({...viewport, latitude: lat, longitude: long})
  }
  
##
