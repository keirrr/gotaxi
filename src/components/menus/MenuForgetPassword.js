import TextInput from "../inputs/TextInput";
import Button from "../buttons/Button";

// Router
import  { Link } from 'react-router-dom'

import { IoChevronBack } from "react-icons/io5";

const MenuForgetPassword = () => {
  return (
    <section className="absolute h-auto w-[400px] ml-5 mt-5 p-[20px] bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="flex pb-[10px] w-full">
        {/* Back icon */}
        <Link to="/login" className="relative p-1 flex items-center w-[24px] h-[24px]">
          <IoChevronBack color="#111827" className="w-[24px] h-[24px]" />
        </Link>
        {/* Logo */}
        <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
          Przypomnij hasło
        </span>
        <div className="p-1 w-[24px] h-[24px]"></div>
      </div>
      <div className="flex flex-col justify-center">
        <TextInput placeholder="Adres e-mail" />
        <Button name="Przypomnij hasło" />
      </div>
    </section>
  );
};

export default MenuForgetPassword;
