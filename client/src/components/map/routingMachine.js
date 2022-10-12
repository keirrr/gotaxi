// Leaflet
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

// CSS
import "./style.css";

const createRoutingMachineLayer = (props) => {
  const control = L.Routing.control({
    waypoints: [
      L.latLng(50.2795003, 18.9704121),
      L.latLng(50.2586555, 19.0420145),
    ],
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

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
