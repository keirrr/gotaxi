import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsDiscountNow,
  setDiscountValue,
} from "../../../../store/orderInfoSlice";

import axios from "axios";

import Button from "../../../buttons/Button";
import SearchOrderItem from "./SearchOrderItem";
import SearchOrderButton from "./SearchOrderButton";

import { IoMdPricetag } from "react-icons/io";

const SearchOrdersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAuth, setIsAuth] = useState(false);

  const isAuthUrl = "http://localhost:5000/api/isAuth";
  useEffect(() => {
    const res = axios.get(isAuthUrl, {
      withCredentials: true,
    });

    res.then((res) => {
      if (res.status === 200) {
        setIsAuth(true);
      }
    });
  });

  const { isDiscountNow, discountValue } = useSelector(
    (state) => state.orderInfo
  );

  const { startLocationName, destLocationName } = useSelector(
    (state) => state.locationInfo
  );

  useEffect(() => {
    // Generate discount value
    if (!isDiscountNow) {
      dispatch(setIsDiscountNow(Math.random() < 0.5));

      const randNum = Math.random() * 30 + 40;
      dispatch(setDiscountValue(Math.round(randNum / 10) * 10));
    }

    // Fill input if location names assigned
    if (startLocationName !== null && destLocationName !== null) {
      document.getElementById(`start-search-input`).value = startLocationName;
      document.getElementById(`dest-search-input`).value = destLocationName;
    }
  }, [destLocationName, dispatch, isDiscountNow, startLocationName]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isAuth) {
      navigate("/order/confirm");
    } else {
      navigate("login");
    }
  };

  return (
    <>
      <div>
        {isDiscountNow && (
          <div className="flex items-center justify-center">
            <IoMdPricetag color="#2EAA68" className="mr-[5px]" />
            <p>
              Zastosowano <span className="font-bold">{discountValue}%</span>{" "}
              zniżki
            </p>
          </div>
        )}
        <form onSubmit={submitHandler}>
          <SearchOrderItem type="regular" />
          <SearchOrderItem type="comfort" />
          <SearchOrderItem type="express" />
          <SearchOrderItem type="walk" />
          {isAuth ? (
            <SearchOrderButton />
          ) : (
            <Button name="Zaloguj się żeby zarezerwować" />
          )}
        </form>
      </div>
    </>
  );
};

export default SearchOrdersList;
