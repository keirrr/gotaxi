/* eslint-disable react/react-in-jsx-scope */
import { IoSearch } from "react-icons/io5";

const SearchButton = () => {
  return (
    <button className="flex justify-center items-center h-[60px] w-[60px] bg-yellow-400 rounded-full transition-colors hover:bg-yellow-300">
      <IoSearch color="#111827" className="w-[42px] h-[42px]" />
    </button>
  );
};

export default SearchButton;
