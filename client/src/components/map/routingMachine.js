// Leaflet
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

// CSS
import "./style.css";

const CreateRoutingMachineLayer = (props) => {
  const control = L.Routing.control({
    waypoints: [L.latLng(null, null), L.latLng(null, null)],
    lineOptions: {
      styles: [{ color: "#FACC15", opacity: 1, weight: 8 }],
    },
    createMarker: function (i: number, waypoint: any, n: number) {
      const marker = L.marker(waypoint.latLng, {
        draggable: true,
        icon: L.icon({
          iconUrl: "./imgs/marker.png",
          iconSize: [48, 48],
        }),
      });
      return marker;
    },
    addWaypoints: false,
    autoRoute: true,
  });

  return control;
};

const RoutingMachine = createControlComponent(CreateRoutingMachineLayer);

export default RoutingMachine;