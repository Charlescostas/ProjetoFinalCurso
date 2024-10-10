import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaFlet/dist/leaflet.css";

export function MapMak() {
  const center = [-28.46728,-48.98578]  
  const [markers,setMarkers] = useState([[{latitude:0,longitude:0,popUp:''}]])

  useEffect(() => {
    const localidadeStorage = localStorage.getItem('Localidades');
    let listaMarkers = []

    if (localidadeStorage) {
        JSON.parse(localidadeStorage).forEach(posicao => {
            if(posicao.latitude !== null && posicao.longitude !== null) {
                listaMarkers.push({latitude: posicao.latitude,
                         longitude: posicao.longitude,
                         popUp: posicao.local})

             }
        })
        setMarkers(listaMarkers)
    }
  }, [])
 
  return (
    <>
    <MapContainer 
        center={center} zoom={11} 
        scrollWheelZoom={false} 
        style={{height:400, width:900}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker,index) => (
        <Marker position={[marker.latitude,marker.longitude]} key={index}>
            <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
    </MapContainer>
    </>
  );
}
