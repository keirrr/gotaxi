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

// Axios
import axios from "axios";

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
          iconUrl: "./imgs/markers/black-marker.png",
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

  const getLocationByCoords = (lat, lng) => {
    const res = axios.get(
      `https://nominatim.openstreetmap.org/search?q=${lat},${lng}&polygon_geojson=1&format=json`
    );

    res.then((res) => {
      const locationInfo = res.data[0].display_name.split(",");

      const house_number = locationInfo[0].trim();
      const road = locationInfo[1].trim();
      const city = locationInfo[4].trim();

      let address = "";

      if (house_number == null && road == null) {
        address = `${city}`;
      } else if (house_number == null) {
        address = `${road},${city}`;
      } else if (house_number != null) {
        address = `${road} ${house_number}, ${city}`;
      }

      return address;
    });
  };

  // Get route info on route found
  control.on("routesfound", function (e) {
    const routes = e.routes;
    const summary = routes[0].summary;

    const totalDistance = summary.totalDistance / 1000;
    const totalTime = summary.totalTime;

    const startLocationName = getLocationByCoords(
      coords.startLat,
      coords.startLng
    );
    const destLocationName = getLocationByCoords(
      coords.destLat,
      coords.destLng
    );

    const searchResultData = {
      startLocationName: startLocationName,
      startLat: coords.startLat,
      startLng: coords.startLng,
      destLocationName: destLocationName,
      destLat: coords.destLat,
      destLng: coords.destLng,
    };

    const url = "http://localhost:5000/api/saveSearchResult";

    axios.post(url, searchResultData, { withCredentials: true }).then((res) => {
      console.log(res);
    });

    dispatch(setDistance(totalDistance));
    dispatch(setTime(totalTime));
    dispatch(setRouteFound(true));
  });

  return control;
};

const RoutingMachine = createControlComponent(CreateRoutingMachineLayer);

export default RoutingMachine;
