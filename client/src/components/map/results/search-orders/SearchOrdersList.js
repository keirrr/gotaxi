import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import SearchOrderItem from "./SearchOrderItem";
import SearchOrderButton from "./SearchOrderButton";

import { IoMdPricetag } from "react-icons/io";

const SearchOrdersList = () => {
  const navigate = useNavigate();

  const [isDiscountNow, setIsDiscountNow] = useState(false);
  const [discountValue, setDiscountValue] = useState();

  useEffect(() => {
    // If there is a discount
    setIsDiscountNow(Math.random() < 0.5);

    // Generate discount value
    if (isDiscountNow) {
      const randNum = Math.random() * 30 + 40;
      setDiscountValue(Math.round(randNum / 10) * 10);
    }
  }, [isDiscountNow]);

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
        <form onSubmit={() => navigate("/order/confirm")}>
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
