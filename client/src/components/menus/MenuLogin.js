// Router
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

import TextInput from "../inputs/TextInput";
import PasswordInput from "../inputs/PasswordInput";
import Button from "../buttons/Button";

import loginUser from "../../features/loginUser";

import validator from "validator";

import { IoChevronBack } from "react-icons/io5";

// Import Redux and notificationSlice
import { useDispatch, useSelector } from "react-redux";
import { setContent } from "../../store/notificationSlice";

const MenuLogin = () => {
  const dispatch = useDispatch();

  const { routeFound } = useSelector((state) => state.locationInfo);

  // Redirect if user is authenticated
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
  }, [navigate, routeFound]);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailError, setEmailError] = useState();

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState();

  const valueHandler = (elem, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [elem]: value,
    }));
  };

  // Check if email exist
  const checkEmailInput = async () => {
    if (userData.email.trim() !== "") {
      if (validator.isEmail(userData.email.trim()) === true) {
        const userEmail = userData.email.trim();
        const url = `http://localhost:5000/api/getOne/${userEmail}`;
        const user = await axios.get(url, { withCredentials: true });
        console.log(user);
        if (user.data.message === "Email not found") {
          setIsEmailValid(false);
          setEmailError("*Podany email nie istnieje");

          setIsPasswordValid(true);
          setPasswordError();
          return;
        }
        setIsEmailValid(true);
        setEmailError();
      }
    }
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();

    const login = await loginUser(userData.email, userData.password);
    if (login.msg === "Wrong data") {
      setIsPasswordValid(false);
      setPasswordError("*Podane hasło jest błędne");
    } else if (login) {
      dispatch(setContent("Pomyślnie zalogowano!"));
      if (routeFound) {
        navigate("/");
      } else {
        navigate("/profile");
      }
    }
  };

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
          Logowanie
        </span>
        <div className="p-1 w-[24px] h-[24px]"></div>
      </div>
      <div className="flex flex-col justify-center">
        <form id="login-form" onSubmit={loginUserHandler}>
          <TextInput
            placeholder="Adres e-mail"
            inputType="email"
            updateState={valueHandler}
            checkInput={checkEmailInput}
            elemToUpdate="email"
            isValid={isEmailValid}
          />
          {!isEmailValid && (
            <p className="text-right text-red-500 text-[14px]">{emailError}</p>
          )}
          <PasswordInput
            placeholder="Hasło"
            inputType="password"
            updateState={valueHandler}
            checkInput={() => {}}
            elemToUpdate="password"
            isValid={isPasswordValid}
          />
          {!isPasswordValid && (
            <p className="text-right text-red-500 text-[14px]">
              {passwordError}
            </p>
          )}
          <Button name="Zaloguj się" />
        </form>

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
