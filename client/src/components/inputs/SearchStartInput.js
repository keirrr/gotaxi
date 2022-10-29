import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { setSearchingTrue } from "../../store/searchingSlice";

import axios from "axios";

import { BiCurrentLocation } from "react-icons/bi";

const SearchStartInput = ({
  setSearchResults,
  setIsSearching,
  setSearchingType,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [timer, setTimer] = useState(null);

  const dispatch = useDispatch();

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

  const searchLocation = async (inputValue) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&addressdetails=1`;

    const res = await axios.get(url);

    setSearchResults(res);
  };

  const inputChanged = (e) => {
    const inputValue = e.target.value;
    setLocationName(inputValue);
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      searchLocation(inputValue);
    }, 500);

    setTimer(newTimer);
  };

  return (
    <div className="relative">
      <div className="flex justify-between relative z-10 h-10 w-full mt-[10px] bg-gray-200 rounded-[10px]">
        <div className="flex justify-center items-center z-10 mx-[10px]">
          <div className="flex justify-center items-center h-[20px] w-[20px] bg-green-400 rounded-full">
            <div className="h-[8px] w-[8px] bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Skąd jedziemy?"
          id="start-search-input"
          className="absolute w-full h-full t-0 px-[40px] py-[5px] bg-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-600"
          autoComplete="off"
          onFocus={() => {
            setIsFocused(true);
            setSearchingType("start");
            dispatch(setSearchingTrue());
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={inputChanged}
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
    </div>
  );
};

export default SearchStartInput;
