/* globals google */
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Circle 
    center={{ lat: -34.397, lng: 150.644 }} 
    radius={1000} 
    options={{strokeColor: '#f44336'}}
    />
    <MarkerWithLabel
      position={{ lat: -34.397, lng: 150.644 }}
      labelAnchor={new google.maps.Point(0, 0)}
      labelStyle={{
        backgroundColor: "rgba(244, 67, 54, 0.75)", 
        color:"white",
        textAlign:"center",
        fontSize: "12px", 
        padding: "24px 32px",
        paddingBottom:"48px",
        borderTopLeftRadius:"100%",
        borderTopRightRadius:"100%",
        borderBottomRightRadius:"100%",
        transform:"translateY(-100%)"
      }}
      icon=" "
    >
      <div><span style={{ fontSize:'1.2em', fontWeight:'bold' }}>Hungary</span><br /><br />Confirmed: 123<br />Deaths: 123 <br />Recovered: 123</div>
    </MarkerWithLabel>
  </GoogleMap>
));

function App() {
  useEffect(() => {
    fetch('http://localhost:8000/data')
    .then(res => res.json())
    .then(locations => {
      const locationsGrouped = {};
      location.forEach(location => {
        id = `${location.state} ${location.country}`

        if(locationsGrouped[id]){
          locationsGrouped[id] = {
            ...locationsGrouped[id],
            confpirmed: locationsGrouped[id].confpirmed + location.confpirmed,
            deaths: locationsGrouped[id].confpirmed + location.confpirmed,
            recovered: locationsGrouped[id].confpirmed + location.confpirmed
          }
        } else {
          locationsGrouped[id] = location
          locationsGrouped[id].id = id
        }
      })
      console.log(locations)
      console.log(locationsGrouped)
    })
  }, [])
  
  return (
    <div className="App">

      <MyMapComponent
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;
