import { IoLocationSharp, IoArrowDown } from "react-icons/io5";

const RecentSearchItem = () => {
  return (
    <div className="flex justify-between items-center w-full h-[60px] mt-[5px] bg-gray-200 rounded-[10px]">
      <div className="flex">
        <div className="flex items-center p-[10px]">
          <IoLocationSharp color="#111827" className="w-[24px] h-[24px]" />
        </div>
        <div>
          <p>Warszawska 13, Katowice</p>
          <p>Mariacka 27, Katowice</p>
        </div>
      </div>
      <div className="flex items-center p-[10px]">
        <IoArrowDown color="#111827" className="w-[24px] h-[24px]" />
      </div>
    </div>
  );
};

export default RecentSearchItem;
