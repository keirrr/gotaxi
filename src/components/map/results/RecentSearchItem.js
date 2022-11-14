import { IoLocationSharp, IoArrowDown } from "react-icons/io5";

const RecentSearchItem = (props) => {
  const selectRecentSearch = () => {
    console.log("search");
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
          <p>{props.startLocationName}</p>
          <p>{props.destLocationName}</p>
        </div>
      </div>
      <div className="flex items-center p-[10px]">
        <IoArrowDown color="#111827" className="w-[24px] h-[24px]" />
      </div>
    </button>
  );
};

export default RecentSearchItem;
