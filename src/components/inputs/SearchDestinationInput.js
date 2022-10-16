import React, { useState } from "react";

import axios from "axios";

import { BiCurrentLocation } from "react-icons/bi";

const SearchDestinationInput = () => {
  const [isFocused, setIsFocused] = useState(false);

  const [userLocation, setUserLocation] = useState([]);
  const [locationName, setLocationName] = useState("");

  const getCurrentPosition = async (props) => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const res = axios.get(
        `https://nominatim.openstreetmap.org/search?q=${latitude},${longitude}&polygon_geojson=1&format=json`
      );

      res.then((res) => {
        const locationInfo = res.data[0].display_name.split(",");
        setLocationName(locationInfo[0].trim() + " " + locationInfo[1].trim());
      });
    };

    const error = () => {
      console.log("Something went wrong!");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <div className="flex justify-between relative h-10 w-full mt-[10px] bg-gray-200 rounded-[10px]">
      <div className="flex justify-center items-center z-10 mx-[10px]">
        <div className="flex justify-center items-center h-[20px] w-[20px] bg-blue-400 rounded-full">
          <div className="h-[8px] w-[8px] bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Dokąd jedziemy?"
        className="absolute w-full h-full t-0 px-[40px] py-[5px] bg-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-600"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={() => {}}
        value={locationName}
      />
      <button
        onClick={getCurrentPosition}
        className={`flex items-center mx-[10px] z-10 transition ${
          isFocused ? "opacity-100" : "opacity-0"
        }`}
      >
        <BiCurrentLocation color="#111827" className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
};

export default SearchDestinationInput;