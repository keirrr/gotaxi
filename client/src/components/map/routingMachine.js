// Leaflet
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

// Redux
import {
  setDistance,
  setTime,
  setRouteFound,
} from "../../store/locationInfoSlice";

// Axios
import axios from "axios";

import black_marker from "../../assets/imgs/markers/black_marker.png";

// CSS
import "./style.css";

const CreateRoutingMachineLayer = ({
  dispatch,
  coords,
  cookies,
  setCookie,
}) => {
  const control = L.Routing.control({
    waypoints: [
      [coords.startLat, coords.startLng],
      [coords.destLat, coords.destLng],
    ],
    lineOptions: {
      styles: [{ color: "#FACC15", opacity: 1, weight: 8 }],
    },
    createMarker: function (i, waypoint) {
      const startMarker = L.marker(waypoint.latLng, {
        draggable: false,
        icon: L.icon({
          iconUrl: "https://i.imgur.com/EO3jEyv.png",
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

    const searchResultData = {
      startLocationName: coords.startLocationName,
      startLat: coords.startLat,
      startLng: coords.startLng,
      destLocationName: coords.destLocationName,
      destLat: coords.destLat,
      destLng: coords.destLng,
    };

    if (coords.startLocationName !== null && coords.destLocationName !== null) {
      // If cookie is not empty
      if (cookies["recent-searches"] && cookies["recent-searches"].length > 0) {
        let prevCookieSearches = cookies["recent-searches"];
        console.log("Dodawanie");
        //console.log("last: " + cookies["recent-searches"]);
        if (prevCookieSearches[2] !== searchResultData) {
          prevCookieSearches.push(searchResultData);
          if (prevCookieSearches.length > 3) {
            prevCookieSearches.shift();
          }
        }
        setCookie("recent-searches", prevCookieSearches);
        console.log("Push not empty", prevCookieSearches);
      } else {
        setCookie("recent-searches", new Array(searchResultData));
        console.log("Push null", cookies);
      }
    }

    dispatch(setDistance(totalDistance));
    dispatch(setTime(totalTime));
    dispatch(setRouteFound(true));
  });

  return control;
};

const RoutingMachine = createControlComponent(CreateRoutingMachineLayer);

export default RoutingMachine;
