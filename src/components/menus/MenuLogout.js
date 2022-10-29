import L from "leaflet";

import { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeScreenTo } from "../../features/menuScreen";
import { setRouteFound } from "../../store/locationInfoSlice";

// Router
import { Outlet, Link } from "react-router-dom";

// Components
import SearchStartInput from "../inputs/SearchStartInput";
import SearchDestinationInput from "../inputs/SearchDestinationInput";
import SearchButton from "../buttons/SearchButton";
import SearchResultsList from "../map/results/SearchResultsList";
import RecentSearchResultsList from "../map/results/RecentSearchResultsList";
import SearchOrdersList from "../map/results/search-orders/SearchOrdersList";

// Icons
import { BiUser } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";

const MenuLogout = () => {
  const dispatch = useDispatch();

  const { isSearching } = useSelector((state) => state.searching);
  const [searchingType, setSearchingType] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { routeFound } = useSelector((state) => state.locationInfo);

  return (
    <section className="absolute z-10 h-auto w-[400px] ml-5 mt-5 bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="relative h-auto w-full p-5 rounded-t-[20px] bg-yellow-400">
        {/* Controls */}
        <div className="flex justify-between w-full">
          {/* Back icon */}
          {routeFound ? (
            <button
              onClick={() => dispatch(setRouteFound(false))}
              className="relative p-1 flex items-center w-[24px] h-[24px]"
            >
              <IoChevronBack color="#111827" className="w-[24px] h-[24px]" />
            </button>
          ) : (
            <div className="p-1 w-[24px] h-[24px]"></div>
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
        <SearchStartInput
          setSearchResults={setSearchResults}
          setSearchingType={setSearchingType}
        />
        <SearchDestinationInput
          setSearchResults={setSearchResults}
          setSearchingType={setSearchingType}
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
