// Router
import { Link } from "react-router-dom";

// React
import { useState } from 'react'

// Axios


// Components
import TextInput from "../inputs/TextInput";
import Button from "../buttons/Button";
import { IoChevronBack } from "react-icons/io5";

const MenuRegister = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    repassword: ''
  })

  const submitHandler = () => {
    console.log(userData.name)
  }

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
        <TextInput placeholder="Imie" setValue={setUserData.name}/>
        <TextInput placeholder="Adres e-mail" />
        <TextInput placeholder="Hasło" />
        <TextInput placeholder="Powtórz hasło" />
        <Button name="Zarejestruj się" clickFunc={submitHandler} />
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
