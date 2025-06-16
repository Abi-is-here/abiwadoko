"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker,Popup } from "react-leaflet";


export default function Map({posts}) {
  console.log(posts)

  return (
      <MapContainer
        center={[0,0]}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: "100%", minHeight: "100%", width: "100%", minWidth:"100%"}}
      >
      
        {posts.map((post, index) => {
            
            const coords = post.data.coordinates;
            
             const hasValidCoordinates =
               Array.isArray(coords) &&
               coords.length === 2 &&
               typeof coords[0] === 'number' &&
               typeof coords[1] === 'number' &&
               (coords[0] !== 0 || coords[1] !== 0);
            
             if (!hasValidCoordinates) return null;

            console.log(coords)
             return (
               <Marker key={index} position={coords}>
                 <Popup>
                   <a href={`/posts/${post.slug}/`}>{post.data.title}</a>
                 </Popup>
               </Marker>
             );
        })}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
  );
}
