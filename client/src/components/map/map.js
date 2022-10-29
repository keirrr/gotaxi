// Leaflet
import L from "leaflet";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import { useDispatch, useSelector } from "react-redux";
import { setSearchingFalse } from "../../store/searchingSlice";

import { useMap } from "react-leaflet/hooks";
import { useRef, useEffect, useState } from "react";

import RoutingMachine from "./routingMachine";

// CSS
import "leaflet/dist/leaflet.css";
import "./style.css";

const Map = () => {
  const dispatch = useDispatch();

  const accessToken =
    "3TMAJftD9pk68IEFxYhkdN0eUhQt9bArNsXGr66oeo7wjs6UkERfY7zyep3quFZc";

  const coords = useSelector((state) => state.locationInfo);
  const [centerCoords, setCenterCoords] = useState([52.23, 21.01]);
  const routingMachine = useRef();

  useEffect(() => {
    const points = [
      [coords.startLat, coords.startLng],
      [coords.destLat, coords.destLng],
    ];

    if (routingMachine.current) {
      routingMachine.current.setWaypoints(points);
      console.log(routingMachine);
    }

    if (coords.startLat != null && coords.startLng != null) {
      setCenterCoords(points[0]);
    }
  }, [coords, routingMachine]);

  return (
    <section
      className="absolute z-0 h-screen w-screen"
      onClick={() => dispatch(setSearchingFalse())}
    >
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
