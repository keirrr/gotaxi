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
  setStartLat,
  setStartLng,
  setDestLat,
  setDestLng,
} from "../../store/locationInfoSlice";

// CSS
import "./style.css";

const CreateRoutingMachineLayer = ({ coords }) => {
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
      const startMarker = L.marker(waypoint.latLng, {
        draggable: false,
        icon: L.icon({
          iconUrl: "./imgs/markers/start-marker.png",
          iconSize: [32, 32],
        }),
      });

      //   let markerType;

      //   // Decide what is type of marker
      //   marker.on("dragstart", function (e) {
      //     const oldCoords = marker.getLatLng();
      //     const { startLat, startLng, destLat, destLng } = coords;
      //     console.log("Compare: ", oldCoords.lat, Number(startLat));
      //     if (
      //       oldCoords.lat === Number(startLat) &&
      //       oldCoords.lng === Number(startLng)
      //     ) {
      //       markerType = "start";
      //     } else if (
      //       oldCoords.lat === Number(destLat) &&
      //       oldCoords.lng === Number(destLng)
      //     ) {
      //       markerType = "dest";
      //     }
      //   });

      //   marker.on("dragend", function (e) {
      //     const newCoords = marker.getLatLng();
      //     console.log("New: ", newCoords);
      //     if (markerType === "start") {
      //       dispatch(setStartLat(newCoords.lat));
      //       dispatch(setStartLng(newCoords.lng));
      //     } else if (markerType === "dest") {
      //       dispatch(setDestLat(newCoords.lat));
      //       dispatch(setDestLng(newCoords.lng));
      //     }
      //     markerType = "";
      //   });

      return startMarker;
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
