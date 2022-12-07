import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OrdersList from "../orders/OrdersList";

import { IoChevronBack } from "react-icons/io5";

const MenuProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
  });

  useEffect(() => {
    const isAuthUrl = "http://localhost:5000/api/isAuth";
    const isAuthData = axios
      .get(isAuthUrl, { withCredentials: true })
      .catch((res) => {
        if (res.status !== 200) {
          navigate("/login");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    isAuthData.then((res) => {
      setUserData({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        avatarUrl: res.data.avatarUrl,
      });
    });
  });

  const backBtnHandler = () => {
    navigate("/profile");
  };

  return (
    <section className="absolute z-10 h-auto w-[400px] ml-5 mt-5 bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="relative h-auto w-full p-5 rounded-t-[20px] bg-yellow-400">
        {/* Controls */}
        <div className="flex w-full">
          {/* Back icon */}
          <button
            onClick={backBtnHandler}
            className="relative p-1 flex items-center w-[24px] h-[24px]"
          >
            <IoChevronBack color="#111827" className="w-[24px] h-[24px]" />
          </button>
          {/* Logo */}
          <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
            Historia przejazdów
          </span>
          <div className="p-1 w-[24px] h-[24px]"></div>
        </div>
      </div>
      {/* Logout */}
      <section className="p-5 pt-0 mt-[20px]">
        <OrdersList />
      </section>
    </section>
  );
};

export default MenuProfile;
