import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
//import "leaflet/dist/leaflet.css";

const Maps = (props) => {
  
    const position = [props.lat, props.long]
    return (
      <Map 
      style={{ height: "250px", width: "450px"}}
      center={position} 
      zoom={props.zoom}
      attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
           Right Here!! <br /> Is Located
          </Popup>
        </Marker>
      </Map>
    )
  
}
export default Maps;