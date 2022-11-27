import { useEffect } from "react";

// Router
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { IoClose } from "react-icons/io5";

// Images
import taxi from "../../imgs/svgs/taxi.svg";
import user from "../../imgs/user.png";

const MenuOrderWaiting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <section className="absolute z-10 h-auto w-[400px] ml-5 mt-5 p-[20px] bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="flex pb-[10px] w-full">
        {/* Back icon */}
        <Link to="/">
          <button className="relative p-1 flex items-center w-[24px] h-[24px]">
            <IoClose color="#111827" className="w-[24px] h-[24px]" />
          </button>
        </Link>
        {/* Logo */}
        <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
          Twój kierowca jest w drodze
        </span>
      </div>
      <div className="mt-4">
        <div className="flex justify-center items-end relative">
          <div className="relative left-8 bottom-8 w-20">
            <img className="w-20 -scale-x-100" src={taxi} alt="User avatar" />
          </div>
          <div className="flex flex-col items-center relative z-10">
            <img className="h-24" src={user} alt="User avatar" />
            <div className="relative bottom-3 bg-gray-200 rounded-full w-fit">
              <p className="px-2 py-1 font-bold text-center">Bartek</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center relative h-16 w-16 mr-4 -left-4 bottom-8 bg-yellow-400 rounded-full">
            <p className="text-3xl font-bold leading-4">4</p>
            <p className="leading-4 mt-1">min</p>
          </div>
        </div>
        <div>
          <p className="text-3xl font-bold text-center">SK 168SK</p>
          <p className="text-xl text-center">Honda Civic</p>
        </div>
      </div>
    </section>
  );
};

export default MenuOrderWaiting;
