// Router
import { Link } from "react-router-dom";

// React
import { useState } from "react";

// Axios
import createUser from '../../features/createUser'

// Components
import TextInput from "../inputs/TextInput";
import Button from "../buttons/Button";
import { IoChevronBack } from "react-icons/io5";

const MenuRegister = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const valueHandler = (elem, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [elem]: value,
    }));
  };

  const submitHandler = () => {
    console.log(userData);
  };

  return (
    <section className="absolute h-auto w-[400px] ml-5 mt-5 p-[20px] bg-white drop-shadow rounded-[20px]">
      {/* Top section */}
      <div className="flex pb-[10px] w-full">
        {/* Back icon */}
        <Link
          to="/login"
          className="relative p-1 flex items-center w-[24px] h-[24px]"
        >
          <IoChevronBack color="#111827" className="w-[24px] h-[24px]" />
        </Link>
        {/* Logo */}
        <span className="relative text-xl font-black text-gray-900 m-0 mx-auto">
          Rejestrowanie
        </span>
        <div className="p-1 w-[24px] h-[24px]"></div>
      </div>
      <div className="flex flex-col justify-center">
        <TextInput
          placeholder="Imie"
          inputType="text"
          updateState={valueHandler}
          elemToUpdate="name"
        />
        <TextInput
          placeholder="Adres e-mail"
          inputType="text"
          updateState={valueHandler}
          elemToUpdate="email"
        />
        <TextInput
          placeholder="Hasło"
          inputType="password"
          updateState={valueHandler}
          elemToUpdate="password"
        />
        <TextInput
          placeholder="Powtórz hasło"
          inputType="password"
          updateState={valueHandler}
          elemToUpdate="repassword"
        />
        <button
          onClick={createUser}
          className="h-[40px] w-full mt-[20px] bg-yellow-400 rounded-[10px] transition-colors hover:bg-yellow-300 active:bg-yellow-500"
        >
          <span className="font-bold">Zarejestruj się</span>
        </button>
        <div className="flex justify-center mt-[10px]">
          <span>Masz już konto?</span>
          <Link
            to="/login"
            className="ml-[5px] hover:text-gray-800 active:text-black"
          >
            <span className="underline">Zaloguj się</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuRegister;
