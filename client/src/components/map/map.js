// Leaflet
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import RoutingMachine from "./routingMachine";

// CSS
import "leaflet/dist/leaflet.css";
import "./style.css";

const Map = () => {
  const accessToken =
    "3TMAJftD9pk68IEFxYhkdN0eUhQt9bArNsXGr66oeo7wjs6UkERfY7zyep3quFZc";

  return (
    <section className="absolute z-0 h-screen w-screen">
      <MapContainer
        className="h-full w-full"
        center={[52.23, 21.01]}
        zoom={14}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib" >&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib" >&copy; OSM contributors</a>'
          url={`https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${accessToken}`}
        />
        <ZoomControl position="topright" />
        <RoutingMachine />
      </MapContainer>
    </section>
  );
};

export default Map;