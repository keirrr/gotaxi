import SearchOrderItem from "./SearchOrderItem";

import { IoMdPricetag } from "react-icons/io";

const SearchOrdersList = () => {
  // If there is a discount
  const isDiscountNow = Math.random() < 0.5;

  // Generate discount value
  let discountValue;
  if (isDiscountNow) {
    const randNum = Math.random() * 30 + 40;
    discountValue = Math.round(randNum / 10) * 10;
    console.log(discountValue);
  }

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
      </div>
    </>
  );
};

export default SearchOrdersList;
