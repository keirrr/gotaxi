// Leaflet
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

// Redux
import { useDispatch } from "react-redux";
import {
  setDistance,
  setTime,
  setRouteFound,
} from "../../store/locationInfoSlice";

// CSS
import "./style.css";

const CreateRoutingMachineLayer = (props) => {
  const { coords } = props;
  const dispatch = useDispatch();

  const control = L.Routing.control({
    waypoints: [
      [coords.startLat, coords.startLng],
      [coords.destLat, coords.destLng],
    ],
    lineOptions: {
      styles: [{ color: "#FACC15", opacity: 1, weight: 8 }],
    },
    createMarker: function (i: number, waypoint: any, n: number) {
      const marker = L.marker(waypoint.latLng, {
        draggable: true,
        icon: L.icon({
          iconUrl: "./imgs/markers/start-marker.png",
          iconSize: [32, 32],
        }),
      });
      return marker;
    },
    addWaypoints: false,
    autoRoute: true,
  });

  // Get route info on route found
  control.on("routesfound", function (e) {
    const routes = e.routes;
    const summary = routes[0].summary;

    const totalDistance = summary.totalDistance / 1000;
    const totalTime = summary.totalTime;

    dispatch(setDistance(totalDistance));
    dispatch(setTime(totalTime));
    dispatch(setRouteFound(true));
  });

  return control;
};

const RoutingMachine = createControlComponent(CreateRoutingMachineLayer);

export default RoutingMachine;
