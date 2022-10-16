import L from "leaflet";
import "leaflet-routing-machine";

import { useDispatch } from "react-redux";
import { setStartLat, setStartLng } from "../../../store/locationCoordsSlice";

import { IoLocationSharp } from "react-icons/io5";

const SearchResultItem = (props) => {
  const dispatch = useDispatch();

  const { tourism, city, house_number, road } = props.result.address;
  const latitude = props.result.geojson.coordinates[0];
  const longitude = props.result.geojson.coordinates[1];

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

  const inputElem = document.getElementById("start-search-input");

  const chooseAddressHandler = () => {
    inputElem.value = address;
    dispatch(setStartLat(latitude));
    dispatch(setStartLng(longitude));

    L.Routing.control.getWaypoints();
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
