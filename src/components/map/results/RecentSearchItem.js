import { useDispatch } from "react-redux";
import {
  setStartLocationName,
  setStartLat,
  setStartLng,
  setDestLocationName,
  setDestLat,
  setDestLng,
  setRouteFound,
} from "../../../store/locationInfoSlice";
import {
  setSelectedItem,
  setIsDiscountNow,
  setDiscountValue,
} from "../../../store/orderInfoSlice";

import { IoLocationSharp, IoArrowDown } from "react-icons/io5";

const RecentSearchItem = (props) => {
  const {
    startLocationName,
    startLat,
    startLng,
    destLocationName,
    destLat,
    destLng,
  } = props.locationInfo;

  const dispatch = useDispatch();

  const selectRecentSearch = () => {
    dispatch(setStartLocationName(startLocationName));
    dispatch(setStartLat(startLat));
    dispatch(setStartLng(startLng));
    dispatch(setDestLocationName(destLocationName));
    dispatch(setDestLat(destLat));
    dispatch(setDestLng(destLng));
    dispatch(setRouteFound(true));
    dispatch(setSelectedItem("regular"));
    document.getElementById("start-search-input").value = startLocationName;
    document.getElementById("dest-search-input").value = destLocationName;
  };

  return (
    <button
      onClick={selectRecentSearch}
      className="flex justify-between items-center w-full h-[60px] mt-[5px] bg-gray-200 rounded-[10px]"
    >
      <div className="flex">
        <div className="flex items-center p-[10px]">
          <IoLocationSharp color="#111827" className="w-[24px] h-[24px]" />
        </div>
        <div className="flex flex-col items-start">
          <p>{startLocationName}</p>
          <p>{destLocationName}</p>
        </div>
      </div>
      <div className="flex items-center p-[10px]">
        <IoArrowDown color="#111827" className="w-[24px] h-[24px]" />
      </div>
    </button>
  );
};

export default RecentSearchItem;
