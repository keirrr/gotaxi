import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import SearchOrderItem from "./SearchOrderItem";
import SearchOrderButton from "./SearchOrderButton";

import { IoMdPricetag } from "react-icons/io";

const SearchOrdersList = () => {
  const navigate = useNavigate();

  // If there is a discount
  const isDiscountNow = Math.random() < 0.5;

  // Generate discount value
  let discountValue;
  if (isDiscountNow) {
    const randNum = Math.random() * 30 + 40;
    discountValue = Math.round(randNum / 10) * 10;
  }

  const chooseHandler = () => {
    navigate("/order/confirm");
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
        <form onSubmit={chooseHandler}>
          <SearchOrderItem
            type="regular"
            isDiscountNow={isDiscountNow}
            discountValue={discountValue}
          />
          <SearchOrderItem
            type="comfort"
            isDiscountNow={isDiscountNow}
            discountValue={discountValue}
          />
          <SearchOrderItem
            type="express"
            isDiscountNow={isDiscountNow}
            discountValue={discountValue}
          />
          <SearchOrderItem type="walk" />
          <SearchOrderButton />
        </form>
      </div>
    </>
  );
};

export default SearchOrdersList;
