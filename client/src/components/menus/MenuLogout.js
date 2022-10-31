import L from "leaflet";

import { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeScreenTo } from "../../features/menuScreen";
import {
  setStartLat,
  setStartLng,
  setDestLat,
  setDestLng,
  setRouteFound,
} from "../../store/locationInfoSlice";
import { setSearchingFalse } from "../../store/searchingSlice";

// Router
import { Outlet, Link } from "react-router-dom";

// Components
import SearchLocationInput from "../inputs/SearchLocationInput";
import SearchButton from "../buttons/SearchButton";
import SearchResultsList from "../map/results/SearchResultsList";
import RecentSearchResultsList from "../map/results/RecentSearchResultsList";
import SearchOrdersList from "../map/results/search-orders/SearchOrdersList";

// Icons
import { BiUser } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const MenuLogout = () => {
  const dispatch = useDispatch();

  const { isSearching, searchingType } = useSelector(
    (state) => state.searching
  );
  const [searchResults, setSearchResults] = useState([]);

  const { startLat, startLng, destLat, destLng } = useSelector(
    (state) => state.locationInfo
  );
  const { routeFound } = useSelector((state) => state.locationInfo);

  const [isStartSelected, setIsStartSelected] = useState(false);
  const [isDestSelected, setIsDestSelected] = useState(false);

  const onEnterPress = (e) => {};

  const resetRoute = () => {
    dispatch(setStartLat(null));
    dispatch(setStartLng(null));
    dispatch(setDestLat(null));
    dispatch(setDestLng(null));
    dispatch(setRouteFound(false));
    setSearchResults([]);
    document.getElementById("start-search-input").value = "";
    document.getElementById("dest-search-input").value = "";
  };

  return (
    <section className="absolute z-10 h-auto w-[400px] ml-5 mt-5 bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="relative h-auto w-full p-5 rounded-t-[20px] bg-yellow-400">
        {/* Controls */}
        <div className="flex justify-between w-full">
          {/* Back icon */}
          {routeFound ? (
            <button
              onClick={resetRoute}
              className="relative p-1 flex items-center w-[32px] h-[32px]"
            >
              <IoClose color="#111827" className="w-full h-full" />
            </button>
          ) : (
            <div className="p-1 w-[32px] h-[32px]"></div>
          )}
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="h-[20px] mr-[5px]"
              src="/imgs/svgs/gotaxi-logo.svg"
              alt="GoTaxi Logo"
            />
            <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
              GoTaxi
            </span>
          </div>
          {/* Profile button */}
          <Link to="/profile">
            <button
              className="relative p-1 flex items-center"
              onClick={() => dispatch(changeScreenTo("login"))}
            >
              <BiUser color="#111827" className="w-[24px] h-[24px]" />
            </button>
          </Link>
        </div>
        {/* Search inputs */}
        <SearchLocationInput
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          inputSearchingType="start"
        />
        <SearchLocationInput
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          inputSearchingType="dest"
        />
      </div>
      {/* Recent searches */}
      <div className="p-5 pt-[10px]">
        <div className="relative">
          {isSearching ? (
            <SearchResultsList
              searchResults={searchResults}
              searchingType={searchingType}
            />
          ) : (
            <>
              {routeFound ? <SearchOrdersList /> : <RecentSearchResultsList />}
            </>
          )}
        </div>
        {/* <div className="flex justify-center w-full">
          <SearchButton />
        </div> */}
      </div>
      <Outlet />
    </section>
  );
};

export default MenuLogout;
