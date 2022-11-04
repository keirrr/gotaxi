import { useSelector } from "react-redux";

import { IoLocationSharp, IoArrowDown } from "react-icons/io5";

const SearchOrderPathInfo = () => {
  const { startLocationName, destLocationName } = useSelector(
    (state) => state.locationInfo
  );

  console.log(startLocationName, destLocationName);
  return (
    <div className="flex justify-between items-center w-full h-[60px] mt-[5px] bg-gray-200 rounded-[10px]">
      <div className="flex">
        <div className="flex items-center p-[10px]">
          <IoLocationSharp color="#111827" className="w-[24px] h-[24px]" />
        </div>
        <div>
          <p>{startLocationName}</p>
          <p>{destLocationName}</p>
        </div>
      </div>
      <div className="flex items-center p-[10px]">
        <IoArrowDown color="#111827" className="w-[24px] h-[24px]" />
      </div>
    </div>
  );
};

export default SearchOrderPathInfo;
