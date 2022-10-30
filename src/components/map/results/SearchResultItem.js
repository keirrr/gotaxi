import "leaflet-routing-machine";

import { useDispatch, useSelector } from "react-redux";
import {
  setStartLat,
  setStartLng,
  setDestLat,
  setDestLng,
} from "../../../store/locationInfoSlice";
import { setSearchingFalse } from "../../../store/searchingSlice";

import { IoLocationSharp } from "react-icons/io5";

const SearchResultItem = (props, { setSearchResults }) => {
  const dispatch = useDispatch();

  const { startLat, startLng, destLat, destLng } = useSelector(
    (state) => state.locationInfo
  );

  const { address, lat, lng } = props.result;

  const { searchingType } = props;

  const chooseAddressHandler = () => {
    const inputElem = document.getElementById(`${searchingType}-search-input`);
    let inputElemToReset;
    if (searchingType === "start") {
      inputElemToReset = document.getElementById("dest-search-input");
    } else {
      inputElemToReset = document.getElementById("start-search-input");
    }
    inputElem.value = address;
    if (searchingType === "start") {
      dispatch(setStartLat(lat));
      dispatch(setStartLng(lng));
      if (destLat == null && destLng == null) {
        inputElemToReset.value = "";
      }
    } else if (searchingType === "dest") {
      dispatch(setDestLat(lat));
      dispatch(setDestLng(lng));
      if (startLat == null && startLng == null) {
        inputElemToReset.value = "";
      }
    }
    dispatch(setSearchingFalse());
  };

  return (
    <div className="pr-[15px] cursor-pointer" onClick={chooseAddressHandler}>
      <div className="flex items-center w-full mt-[5px] bg-gray-200 rounded-[10px]">
        <div className="p-[10px]">
          <IoLocationSharp color="#111827" className="w-[24px] h-[24px]" />
        </div>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default SearchResultItem;
