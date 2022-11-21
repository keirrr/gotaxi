import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeScreenTo } from "../../features/menuScreen";
import {
  setStartLocationName,
  setStartLat,
  setStartLng,
  setDestLocationName,
  setDestLat,
  setDestLng,
  setRouteFound,
} from "../../store/locationInfoSlice";
import { setSearchResults } from "../../store/searchingSlice";
import {
  setSelectedItem,
  setIsDiscountNow,
  setDiscountValue,
} from "../../store/orderInfoSlice";

// Router
import { Outlet, Link } from "react-router-dom";

// Cookies
import { useCookies } from "react-cookie";

// Components
import SearchLocationInput from "../inputs/SearchLocationInput";
import SearchResultsList from "../map/results/SearchResultsList";
import SearchOrdersList from "../map/results/search-orders/SearchOrdersList";
import RecentSearchResultsList from "../map/results/RecentSearchResultsList";

// Icons
import { BiUser } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const MenuLogout = () => {
  const [cookies, setCookie] = useCookies([]);

  useEffect(() => {
    console.log(cookies);
  });

  const dispatch = useDispatch();
  const { isSearching, searchingType } = useSelector(
    (state) => state.searching
  );

  const {
    startLocationName,
    startLat,
    startLng,
    destLocationName,
    destLat,
    destLng,
    routeFound,
  } = useSelector((state) => state.locationInfo);

  useEffect(() => {
    console.log(routeFound);
  });

  // useEffect(() => {
  //   if (routeFound) {
  //     const locationCookieInfo = {
  //       startLocationName,
  //       startLat,
  //       startLng,
  //       destLocationName,
  //       destLat,
  //       destLng,
  //     };

  //     if (
  //       // If cookie is not empty
  //       cookies["recent-searches"] &&
  //       cookies["recent-searches"].length > 0
  //     ) {
  //       let prevCookieSearches = cookies["recent-searches"];
  //       console.log("Dodawanie");
  //       //console.log("last: " + cookies["recent-searches"]);
  //       //if (prevCookieSearches[2] !== locationCookieInfo) {
  //       prevCookieSearches.push(locationCookieInfo);
  //       // if (prevCookieSearches.length > 3) {
  //       //   prevCookieSearches.shift();
  //       // }
  //       //}
  //       setCookie("recent-searches", prevCookieSearches);
  //       console.log("Push not empty", prevCookieSearches);
  //     } else {
  //       setCookie("recent-searches", new Array(locationCookieInfo));
  //       //console.log("Push null", cookies);
  //     }
  //   }
  // });

  const resetRoute = () => {
    dispatch(setStartLocationName(null));
    dispatch(setStartLat(null));
    dispatch(setStartLng(null));
    dispatch(setDestLocationName(null));
    dispatch(setDestLat(null));
    dispatch(setDestLng(null));
    dispatch(setRouteFound(false));
    dispatch(setSelectedItem("regular"));
    dispatch(setIsDiscountNow(false));
    dispatch(setDiscountValue(null));
    dispatch(setSearchResults([]));
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
        <SearchLocationInput inputSearchingType="start" />
        <SearchLocationInput inputSearchingType="dest" />
      </div>
      {/* Recent searches */}
      <div className="p-5 pt-[10px]">
        <div className="relative">
          {isSearching ? (
            <SearchResultsList searchingType={searchingType} />
          ) : (
            <>
              {routeFound ? <SearchOrdersList /> : <RecentSearchResultsList />}
            </>
          )}
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default MenuLogout;
