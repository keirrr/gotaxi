import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import { useDispatch, useSelector } from "react-redux";
import { setSearchingFalse } from "../../store/searchingSlice";

import { useRef, useEffect, useState } from "react";

// Cookies
import { useCookies } from "react-cookie";

import RoutingMachine from "./routingMachine";

// CSS
import "leaflet/dist/leaflet.css";
import "./style.css";

const Map = () => {
  const dispatch = useDispatch();
  const routingMachine = useRef();

  const coords = useSelector((state) => state.locationInfo);

  const [cookies, setCookie] = useCookies([]);

  const [centerCoords, setCenterCoords] = useState([52.23, 21.01]);

  const accessToken =
    "3TMAJftD9pk68IEFxYhkdN0eUhQt9bArNsXGr66oeo7wjs6UkERfY7zyep3quFZc";

  useEffect(() => {
    const points = [
      [coords.startLat, coords.startLng],
      [coords.destLat, coords.destLng],
    ];

    if (coords.startLat != null && coords.startLng != null) {
      setCenterCoords(points[0]);
    }
    if (coords.destLat != null && coords.destLng != null) {
      setCenterCoords(points[1]);
    }

    if (routingMachine.current) {
      routingMachine.current.setWaypoints(points);
    }
  }, [coords, routingMachine]);

  return (
    <section
      className="absolute z-0 h-screen w-screen"
      onClick={() => dispatch(setSearchingFalse())}
    >
      <MapContainer
        key={JSON.stringify(centerCoords)}
        id="map"
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
        <RoutingMachine
          ref={routingMachine}
          coords={coords}
          dispatch={dispatch}
          cookies={cookies}
          setCookie={setCookie}
        />
      </MapContainer>
    </section>
  );
};

export default Map;
