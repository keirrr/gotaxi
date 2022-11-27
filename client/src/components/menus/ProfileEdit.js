import Button from "../buttons/Button";

import validator from "validator";

import axios from "axios";

import logoutUser from "../../features/logoutUser";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Redux and notificationSlice
import { useDispatch } from "react-redux";
import { setContent } from "../../store/notificationSlice";

import WhiteButton from "../buttons/WhiteButton";
import TextInput from "../inputs/TextInput";
import PasswordInput from "../inputs/PasswordInput";

import { IoChevronBack } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";

const MenuProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

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
      setUserData({ name: res.data.name, email: res.data.email });
    });
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

  const backBtnHandler = () => {
    navigate("/profile");
  };

  const deleteAccHandler = async (e) => {
    e.preventDefault();
  };

  const saveHandler = async (e) => {
    e.preventDefault();

    // Validation
    // checkNameInput();
    // checkPasswordInput();
    // checkRepasswordInput();

    if (isFilePicked) {
      console.log("Upload");
      const uploadUrl = "http://localhost:5000/api/upload";
      const upload = await axios
        .post(uploadUrl, selectedFile, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const uploadFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
    const imgSrc = URL.createObjectURL(e.target.files[0]);
    const avatarElem = document.getElementById("user-avatar");
    avatarElem.src = imgSrc;
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
            Edytuj profil
          </span>
          <div className="p-1 w-[24px] h-[24px]"></div>
        </div>

        {/* User avatar */}
        <div className="relative flex justify-center mt-[20px]">
          <form className="absolute h-[42px] w-[42px] p-1 translate-x-8 rounded-full bg-white hover:bg-gray-200">
            <label htmlFor="file">
              <MdOutlineFileUpload className="h-full w-full" />
            </label>
            <input
              id="file"
              name="file"
              className="hidden"
              type="file"
              accept="image/png, image/jpeg"
              onChange={uploadFileHandler}
            />
          </form>
          <img
            id="user-avatar"
            className="h-[96px] w-[96px] rounded-full object-cover"
            alt="User avatar"
          />
        </div>
      </div>
      {/* Logout */}
      <section className="p-5 pt-0 mt-[20px]">
        <TextInput
          placeholder={userData.name}
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
          placeholder={userData.email}
          inputType="text"
          disabled
          isValid="true"
        />
        <TextInput
          placeholder="Zmień hasło"
          inputType="password"
          updateState={valueHandler}
          elemToUpdate="password"
          min="8"
          max="64"
          checkInput={checkPasswordInput}
          isValid={isPasswordValid}
          notRequired
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
          notRequired
        />
        {!isRepasswordValid && (
          <p className="text-right text-red-500 text-[14px]">
            {repasswordInputError}
          </p>
        )}
        <Button
          name="Usuń konto"
          important={true}
          clickFunc={deleteAccHandler}
        />
        <Button name="Zapisz ustawienia" clickFunc={saveHandler} />
      </section>
    </section>
  );
};

export default MenuProfile;
