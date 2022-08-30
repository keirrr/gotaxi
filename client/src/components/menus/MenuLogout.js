//Redux
// useSelector is used for reading data
// useDispatch is used for updating data
import { useDispatch } from "react-redux";
import { changeScreenTo } from "../../features/menuScreen";

// Router
import { Outlet, Link } from "react-router-dom";

import axios from 'axios'

// Components
import SearchStartInput from "../inputs/SearchStartInput";
import SearchDestinationInput from "../inputs/SearchDestinationInput";
import RecentSearchItem from "../RecentSearchItem";
import SearchButton from "../buttons/SearchButton";

// Icons
import { BiUser } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";

const MenuLogout = () => {
  const dispatch = useDispatch();

  axios.get("http://localhost:5000/")

  return (
    <section className="absolute h-auto w-[400px] ml-5 mt-5 bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="relative h-auto w-full p-5 rounded-t-[20px] bg-yellow-400">
        {/* Controls */}
        <div className="flex justify-between w-full">
          {/* Back icon */}
          <div className="p-1 w-[24px] h-[24px]"></div>
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-[20px] mr-[5px]" src="/imgs/svgs/gotaxi-logo.svg" alt="GoTaxi Logo"/>
            <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
              GoTaxi
            </span>
          </div>
          {/* Profile button */}
          <Link to="/login">
            <button
              className="relative p-1 flex items-center"
              onClick={() => dispatch(changeScreenTo("login"))}
            >
              <BiUser color="#111827" className="w-[24px] h-[24px]" />
            </button>
          </Link>
        </div>
        {/* Search inputs */}
        <SearchStartInput />
        <SearchDestinationInput />
      </div>
      {/* Recent searches */}
      <div className="p-5 pt-[10px]">
        <div className="pb-[20px]">
          <p className="font-bold">Ostatnie wyszukiwania</p>
          <RecentSearchItem />
          <RecentSearchItem />
          <RecentSearchItem />
        </div>
        <div className="flex justify-center w-full">
          <SearchButton />
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default MenuLogout;
