import "leaflet-routing-machine";

import { useDispatch } from "react-redux";
import {
  setStartLat,
  setStartLng,
  setDestLat,
  setDestLng,
} from "../../../store/locationCoordsSlice";

import { IoLocationSharp } from "react-icons/io5";

const SearchResultItem = (props) => {
  const dispatch = useDispatch();

  const { address, lat, lng } = props.result;

  const { searchingType } = props;

  const chooseAddressHandler = () => {
    if (searchingType === "start") {
      const inputElem = document.getElementById("start-search-input");
      inputElem.value = address;
      dispatch(setStartLat(lat));
      dispatch(setStartLng(lng));
    }
    if (searchingType === "dest") {
      const inputElem = document.getElementById("dest-search-input");
      inputElem.value = address;
      dispatch(setDestLat(lat));
      dispatch(setDestLng(lng));
    }
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
