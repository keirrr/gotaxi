// Redux
import { useDispatch } from "react-redux";
import { changeScreenTo } from "../../features/menuScreen";

// Router
import { Outlet, Link } from "react-router-dom";

import { useState } from 'react'

import TextInput from "../inputs/TextInput";
import Button from "../buttons/Button";

import { IoChevronBack } from "react-icons/io5";

const MenuLogin = () => {

  return (
    <section className="absolute h-auto w-[400px] ml-5 mt-5 p-[20px] bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="flex pb-[10px] w-full">
        {/* Back icon */}
        <Link to="/">
          <button
            className="relative p-1 flex items-center w-[24px] h-[24px]"
          >
            <IoChevronBack color="#111827" className="w-[24px] h-[24px]" />
          </button>
        </Link>
        {/* Logo */}
        <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
          Logowanie
        </span>
        <div className="p-1 w-[24px] h-[24px]"></div>
      </div>
      <div className="flex flex-col justify-center">
        <TextInput placeholder="Adres e-mail" />
        <TextInput placeholder="Hasło" />
        <Button name="Zaloguj się" />

        <Link
          to="/recover"
          className="mt-[10px] text-center hover:text-gray-800 active:text-black"
        >
          <span className="underline">Przypomnij hasło</span>
        </Link>

        <div className="flex justify-center mt-[10px]">
          <span>Nie masz konta?</span>

          <Link
            to="/register"
            className="ml-[5px] hover:text-gray-800 active:text-black"
          >
            <span className="underline">Załóż konto</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuLogin;
