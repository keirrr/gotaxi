import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSearchingTrue, setSearchingType } from "../../store/searchingSlice";
import {
  setStartLat,
  setStartLng,
  setStartLocationName,
  setDestLat,
  setDestLng,
  setDestLocationName,
} from "../../store/locationInfoSlice.js";
import { setSearchingFalse } from "../../store/searchingSlice";

import axios from "axios";

import { BiCurrentLocation } from "react-icons/bi";
import { IoRepeat } from "react-icons/io5";

const SearchLocationInput = ({
  searchResults,
  setSearchResults,
  setIsSearching,
  inputSearchingType,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [timer, setTimer] = useState(null);

  const dispatch = useDispatch();

  const { isSearching, searchingType } = useSelector(
    (state) => state.searching
  );
  const { startLat, startLng, destLat, destLng } = useSelector(
    (state) => state.locationInfo
  );
  const { routeFound } = useSelector((state) => state.locationInfo);

  const [hideCurrentLocation, setHideCurrentLocation] = useState(true);

  const getCurrentPosition = async (props) => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      if (inputSearchingType === "start") {
        dispatch(setStartLat(latitude));
        dispatch(setStartLng(longitude));
      } else if (inputSearchingType === "dest") {
        dispatch(setDestLat(latitude));
        dispatch(setDestLng(longitude));
      }

      const res = axios.get(
        `https://nominatim.openstreetmap.org/search?q=${latitude},${longitude}&polygon_geojson=1&format=json`
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

        document.getElementById(`${inputSearchingType}-search-input`).value =
          address;
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
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      searchLocation(inputValue);
    }, 500);

    setTimer(newTimer);
  };

  const swapDates = () => {
    let startInputValue = document.getElementById(`start-search-input`).value;
    let destInputValue = document.getElementById(`dest-search-input`).value;

    document.getElementById(`start-search-input`).value = destInputValue;
    document.getElementById(`dest-search-input`).value = startInputValue;

    dispatch(setStartLat(destLat));
    dispatch(setStartLng(destLng));
    dispatch(setDestLat(startLat));
    dispatch(setDestLng(startLng));
  };

  // Pick location on enter
  const onEnterPress = (e) => {
    if (isSearching && searchResults.data) {
      const searchInputElem = document.getElementById(
        `${searchingType}-search-input`
      );

      if (e.key === "Enter") {
        const firstLocationInfo = searchResults.data[0];

        let inputElemToReset;
        if (searchingType === "start") {
          inputElemToReset = document.getElementById("dest-search-input");
        } else {
          inputElemToReset = document.getElementById("start-search-input");
        }

        // Set input value
        const { tourism, city, house_number, road } = firstLocationInfo.address;

        let address;

        if (house_number == null && road == null) {
          address = `${city}`;
        } else if (house_number == null) {
          address = `${road}, ${city}`;
        } else if (house_number == null && tourism == null) {
          address = `${road}, ${city}`;
        } else if (house_number == null && tourism != null) {
          address = `${tourism}, ${road}, ${city}`;
        } else if (house_number != null && tourism == null) {
          address = `${road} ${house_number}, ${city}`;
        } else if (house_number != null && tourism != null) {
          address = `${tourism}, ${road} ${house_number}, ${city}`;
        }

        searchInputElem.value = address;

        const { lat, lon } = firstLocationInfo;
        if (searchingType === "start") {
          dispatch(setStartLat(lat));
          dispatch(setStartLng(lon));
          dispatch(setStartLocationName(address));
          if (destLat == null && destLng == null) {
            inputElemToReset.value = "";
          }
        } else if (searchingType === "dest") {
          dispatch(setDestLat(lat));
          dispatch(setDestLng(lon));
          dispatch(setDestLocationName(address));
          if (startLat == null && startLng == null) {
            inputElemToReset.value = "";
          }
        }
        dispatch(setSearchingFalse());

        // Focus next input when input is start type
        if (searchingType === "start") {
          const destInput = document.getElementById("dest-search-input");
          destInput.focus();
        }
      }
    }
  };

  // Disable current location button on blur
  useEffect(() => {
    if (!isFocused) {
      setTimeout(() => {
        setHideCurrentLocation(true);
      }, 100);
    } else {
      setHideCurrentLocation(false);
    }
  }, [isFocused]);

  return (
    <div className="relative">
      <div className="flex justify-between relative z-10 h-10 w-full mt-[10px] bg-gray-200 rounded-[10px]">
        <div className="flex justify-center items-center z-10 mx-[10px]">
          <div
            className={`flex justify-center items-center h-[20px] w-[20px] rounded-full ${
              inputSearchingType === "start" ? "bg-green-400" : "bg-blue-400"
            }`}
          >
            <div className="h-[8px] w-[8px] bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <input
          type="text"
          placeholder={
            inputSearchingType === "start"
              ? "Skąd jedziemy?"
              : "Dokąd jedziemy?"
          }
          id={`${inputSearchingType}-search-input`}
          className="absolute w-full h-full t-0 px-[40px] py-[5px] bg-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-600"
          autoComplete="off"
          onFocus={() => {
            dispatch(setSearchingType(inputSearchingType));
            dispatch(setSearchingTrue());
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={inputChanged}
          onKeyPress={onEnterPress}
        />
        <div
          className={`flex row transition-all ${
            isFocused && routeFound && inputSearchingType === "dest"
              ? "w-[55px]"
              : "w-[20px] mr-[10px]"
          } delay-[50ms]`}
        >
          {inputSearchingType === "dest" && (
            <>
              {routeFound && (
                <button
                  onClick={swapDates}
                  className={`flex items-center mr-[5px] z-10 opacity-100
            `}
                  tabIndex="-1"
                >
                  <IoRepeat
                    color="#111827"
                    className="w-[20px] h-[20px] rotate-90"
                  />
                </button>
              )}
            </>
          )}
          <button
            id="current-location"
            onClick={getCurrentPosition}
            className={`flex items-center z-10 transition-all opacity-0 ${
              isFocused && "opacity-100 delay-[100ms]"
            }`}
            disabled={hideCurrentLocation}
            tabIndex="-1"
          >
            <BiCurrentLocation
              color="#111827"
              className={`w-[20px] h-[20px]`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchLocationInput;
