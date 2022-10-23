// Leaflet
import L from "leaflet";
import { MapContainer, TileLayer, ZoomControl, Marker } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";

import { useSelector } from "react-redux";

import { useRef, useEffect, useState } from "react";

import RoutingMachine from "./routingMachine";

// CSS
import "leaflet/dist/leaflet.css";
import "./style.css";

const Map = () => {
  const accessToken =
    "3TMAJftD9pk68IEFxYhkdN0eUhQt9bArNsXGr66oeo7wjs6UkERfY7zyep3quFZc";

  const coords = useSelector((state) => state.locationCoords);

  const [centerCoords, setCenterCoords] = useState([52.23, 21.01]);

  const routingMachine = useRef();

  console.log("reset");

  useEffect(() => {
    const points = [
      [coords.startLat, coords.startLng],
      [coords.destLat, coords.destLng],
    ];

    console.log("eff");

    if (routingMachine.current) {
      console.log("waypoint");
      routingMachine.current.setWaypoints(points);
    }

    if (coords.startLat != null && coords.startLng != null) {
      setCenterCoords([coords.startLat, coords.startLng]);
    }
  }, [coords, routingMachine]);

  console.log(centerCoords);

  return (
    <section className="absolute z-0 h-screen w-screen">
      <MapContainer
        key={JSON.stringify(centerCoords)}
        className="h-full w-full"
        center={centerCoords}
        zoom={14}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib" >&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib" >&copy; OSM contributors</a>'
          url={`https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${accessToken}`}
        />
        <ZoomControl position="topright" />
        <RoutingMachine ref={routingMachine} coords={coords} />
      </MapContainer>
    </section>
  );
};

export default Map;
