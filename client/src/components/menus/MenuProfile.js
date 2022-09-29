import Button from "../buttons/Button";

import axios from "axios";

import React from "react";
import { useNavigate } from "react-router-dom";

import { IoChevronBack } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";

const MenuProfile = () => {
  const navigate = useNavigate();

  const isAuthUrl = "http://localhost:5000/api/isAuth";
  React.useEffect(() => {
    axios
      .get(isAuthUrl)
      .then((res) => {
      })
      .catch(function (error) {
        navigate("/login");
        console.log(error);
      });
  });

  return (
    <section className="absolute h-auto w-[400px] ml-5 mt-5 bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="relative h-auto w-full p-5 rounded-t-[20px] bg-yellow-400">
        {/* Controls */}
        <div className="flex w-full">
          {/* Back icon */}
          <button className="relative p-1 flex items-center w-[24px] h-[24px]">
            <IoChevronBack color="#111827" className="w-[24px] h-[24px]" />
          </button>
          {/* Logo */}
          <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
            Profil
          </span>
          <div className="p-1 w-[24px] h-[24px]"></div>
        </div>

        {/* User avatar */}
        <div className="flex justify-center mt-[20px]">
          <BiUserCircle className="h-[96px] w-[96px]" />
        </div>

        {/* Username */}
        <p className="text-center font-bold text-lg">Username</p>
      </div>
      {/* Recent searches */}
      <div className="p-5 pt-0">
        <Button name="Wyloguj się" />
      </div>
    </section>
  );
};

export default MenuProfile;
