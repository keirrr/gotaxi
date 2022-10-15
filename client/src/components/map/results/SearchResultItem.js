import { IoLocationSharp } from "react-icons/io5";

const SearchResultItem = () => {
  return (
    <div
      className="flex items-center w-full h-[40px] mt-[5px] bg-gray-200 rounded-[10px] cursor-pointer"
      onChange={() => {}}
    >
      <div className="p-[10px]">
        <IoLocationSharp color="#111827" className="w-[24px] h-[24px]" />
      </div>
      <p>Warszawska 13, Katowice</p>
    </div>
  );
};

export default SearchResultItem;
