// Router
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { IoChevronBack } from "react-icons/io5";

const MenuOrderWaiting = () => {
  const navigate = useNavigate();

  return (
    <section className="absolute z-10 h-auto w-[400px] ml-5 mt-5 p-[20px] bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="flex pb-[10px] w-full">
        {/* Back icon */}
        <Link to="/">
          <button className="relative p-1 flex items-center w-[24px] h-[24px]">
            <IoChevronBack color="#111827" className="w-[24px] h-[24px]" />
          </button>
        </Link>
        {/* Logo */}
        <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
          Twój kierowca jest w drodze
        </span>
      </div>
      <form></form>
    </section>
  );
};

export default MenuOrderWaiting;
