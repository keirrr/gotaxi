// Router
import { Link } from "react-router-dom";

// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import validator from "validator";

// Axios
import axios from "axios";

import createUser from "../../features/createUser";

// Components
import TextInput from "../inputs/TextInput";
import { IoChevronBack } from "react-icons/io5";

const MenuRegister = () => {
  const navigate = useNavigate();

  const isAuthUrl = "http://localhost:5000/api/isAuth";
  useEffect(() => {
    const res = axios.get(isAuthUrl, {
      withCredentials: true,
    });

    res.then((res) => {
      if (res.status === 200) {
        navigate("/profile");
      }
    });
  }, [navigate]);

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

  // Validation (but not DRY yet xD)
  const [isNameValid, setIsNameValid] = useState(true);
  const [nameInputError, setNameInputError] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailInputError, setEmailInputError] = useState("");

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordInputError, setPasswordInputError] = useState("");

  const [isRepasswordValid, setIsRepasswordValid] = useState(true);
  const [repasswordInputError, setRepasswordInputError] = useState("");

  const checkNameInput = () => {
    if (userData.name.trim() === "") {
      setIsNameValid(false);
      setNameInputError("*Imie jest wymagane");
    } else {
      if (/[a-zA-Z]$/.test(userData.name) === false) {
        setIsNameValid(false);
        setNameInputError("*Imie może zawierać tylko litery");
        return;
      }
      setIsNameValid(true);
      setNameInputError("");
    }
  };

  const checkEmailInput = () => {
    if (userData.email.trim() === "") {
      setIsEmailValid(false);
      setEmailInputError("*Adres email jest wymagany");
      return;
    } else {
      if (validator.isEmail(userData.email) === false) {
        setIsEmailValid(false);
        setEmailInputError("*Adres email jest niepoprawny");
        return;
      }
      setIsEmailValid(true);
      setEmailInputError("");
    }
  };

  const checkPasswordInput = () => {
    if (userData.password.trim() === "") {
      setIsPasswordValid(false);
      setPasswordInputError("*Hasło jest wymagane");
    } else {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
      if (regex.test(userData.password) === false) {
        setIsPasswordValid(false);
        setPasswordInputError(
          "*Hasło powinno posiadać przynajmniej 8 znaków, jedną dużą literę oraz jedną małą literę"
        );
        return;
      }
      if (
        userData.repassword.trim() !== "" &&
        userData.password !== userData.repassword
      ) {
        setPasswordInputError("");
        setIsPasswordValid(false);
        setIsRepasswordValid(false);
        setRepasswordInputError("*Hasła są od siebie różne");
        return;
      }
      setIsPasswordValid(true);
      setIsRepasswordValid(true);
      setPasswordInputError("");
    }
  };

  const checkRepasswordInput = () => {
    if (userData.repassword.trim() === "") {
      setIsRepasswordValid(false);
      setRepasswordInputError("*Powtórzenie hasła jest wymagane");
    } else {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
      if (regex.test(userData.password) === false) {
        return;
      }
      if (userData.repassword !== userData.password) {
        setIsPasswordValid(false);
        setIsRepasswordValid(false);
        setRepasswordInputError("*Hasła są od siebie różne");
        return;
      }
      setIsRepasswordValid(true);
      setIsPasswordValid(true);
      setRepasswordInputError("");
      setPasswordInputError("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
    checkNameInput();
    checkEmailInput();
    checkPasswordInput();
    checkRepasswordInput();

    const register = await createUser(
      userData.name,
      userData.email,
      userData.password
    );
    if (register) {
      navigate("/profile");
    }
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
        {!isNameValid && (
          <p className="text-right text-red-500 text-[14px]">
            {nameInputError}
          </p>
        )}
        <TextInput
          placeholder="Adres e-mail"
          inputType="text"
          updateState={valueHandler}
          elemToUpdate="email"
          checkInput={checkEmailInput}
          isValid={isEmailValid}
        />
        {!isEmailValid && (
          <p className="text-right text-red-500 text-[14px]">
            {emailInputError}
          </p>
        )}
        <TextInput
          placeholder="Hasło"
          inputType="password"
          updateState={valueHandler}
          elemToUpdate="password"
          min="8"
          max="64"
          checkInput={checkPasswordInput}
          isValid={isPasswordValid}
        />
        {!isPasswordValid && (
          <p className="text-right text-red-500 text-[14px]">
            {passwordInputError}
          </p>
        )}
        <TextInput
          placeholder="Powtórz hasło"
          inputType="password"
          updateState={valueHandler}
          elemToUpdate="repassword"
          min="8"
          max="64"
          checkInput={checkRepasswordInput}
          isValid={isRepasswordValid}
        />
        {!isRepasswordValid && (
          <p className="text-right text-red-500 text-[14px]">
            {repasswordInputError}
          </p>
        )}
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
