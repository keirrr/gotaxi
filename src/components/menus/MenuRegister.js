// Router
import { Link } from "react-router-dom";

// React
import { useState } from "react";

import validator from 'validator';

// Axios
import createUser from "../../features/createUser";

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

  const [isNameValid, setIsNameValid] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isRepasswordValid, setIsRepasswordValid] = useState(true)

  const valueHandler = (elem, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [elem]: value,
    }));
  };

  // Validation (but not DRY yet xD)
  const checkNameInput = () => {
    if (userData.name.trim() === ""){
      setIsNameValid(false)
    } else {
      setIsNameValid(true)
    }
  }

  const checkEmailInput = () => {
    if (userData.email.trim() === ""){
      setIsEmailValid(false)
      return
    } else {
      if (validator.isEmail(userData.email) === false){
        setIsEmailValid(false)
        return
      }
      setIsEmailValid(true)
    }
  }

  const checkPasswordInput = () => {
    if (userData.password.trim() === ""){
      setIsPasswordValid(false)
    } else {
      if(userData.repassword !== userData.password){
        setIsPasswordValid(false)
        setIsRepasswordValid(false)
        return
      }
      setIsPasswordValid(true)
    }
  }

  const checkRepasswordInput = () => {
    if (userData.repassword.trim() === ""){
      setIsRepasswordValid(false)
    } else {
      if(userData.repassword !== userData.password){
        setIsPasswordValid(false)
        setIsRepasswordValid(false)
        return
      }
      setIsRepasswordValid(true)
    }
  }


  const submitHandler = (e) => {
    e.preventDefault();

    

    createUser(userData.name, userData.email, userData.password);
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
      <form onSubmit={submitHandler} className="flex flex-col justify-center">
        <TextInput
          placeholder="Imie"
          inputType="text"
          updateState={valueHandler}
          elemToUpdate="name"
          min="2"
          max="30"
          pattern="[a-zA-Z]{2,30}"
          checkInput={checkNameInput}
          isValid={isNameValid}
        />
        <TextInput
          placeholder="Adres e-mail"
          inputType="text"
          updateState={valueHandler}
          elemToUpdate="email"
          checkInput={checkEmailInput}
          isValid={isEmailValid}
        />
        <TextInput
          placeholder="Hasło"
          inputType="password"
          updateState={valueHandler}
          elemToUpdate="password"
          min="8"
          max="64"
          pattern="/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,64}$/"
          checkInput={checkPasswordInput}
          isValid={isPasswordValid}
        />
        <TextInput
          placeholder="Powtórz hasło"
          inputType="password"
          updateState={valueHandler}
          elemToUpdate="repassword"
          min="8"
          max="64"
          pattern="/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,64}$/"
          checkInput={checkRepasswordInput}
          isValid={isRepasswordValid}
        />
        <button className="h-[40px] w-full mt-[20px] bg-yellow-400 rounded-[10px] transition-colors hover:bg-yellow-300 active:bg-yellow-500">
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
      </form>
    </section>
  );
};

export default MenuRegister;
