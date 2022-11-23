import { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "../../../../store/locationInfoSlice";
import { setSelectedItem } from "../../../../store/orderInfoSlice";

import moment from "moment";

// Loader
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { IoMdPricetag } from "react-icons/io";

const SearchOrderItem = (props) => {
  const { type } = props;

  const routeInfo = useSelector((state) => state.locationInfo);
  const { selectedItem } = useSelector((state) => state.orderInfo);
  const { isDiscountNow, discountValue } = useSelector(
    (state) => state.orderInfo
  );

  const dispatch = useDispatch();

  // Selected order item
  const isItemSelected = selectedItem === type;

  const [time, setTime] = useState();
  const [isTimeCalculated, setIsTimeCalculated] = useState(false);
  const [price, setPriceLocally] = useState();
  const [discountedPrice, setDiscountedPrice] = useState();
  const [isPriceCalculated, setIsPriceCalculated] = useState(false);

  // Order price and distance info
  const { totalDistance, totalTime } = routeInfo;
  let convertedTime, daysDiff;

  let timeMultiplier = 1;
  let priceMultiplier = 1;
  let vechicleImage = "taxi";
  let name = type.charAt(0).toUpperCase() + type.slice(1);

  switch (type) {
    case "comfort":
      priceMultiplier = 1.2;
      break;

    case "express":
      timeMultiplier = 0.6;
      priceMultiplier = 1.4;
      vechicleImage = "police";
      break;

    case "walk":
      vechicleImage = "walk";
      if (totalDistance !== 0) {
        convertedTime = moment().add(totalDistance * 10, "minutes");

        const todayDate = moment();
        daysDiff = convertedTime.diff(todayDate, "days", true);
      }
      break;

    default:
      break;
  }

  if (type !== "walk" && totalTime !== 0) {
    convertedTime = moment()
      .add(totalTime * timeMultiplier, "seconds")
      .add(4, "minutes");

    const todayDate = moment();
    daysDiff = convertedTime.diff(todayDate, "days", true);
  }

  useEffect(() => {
    if (daysDiff < 1) {
      setTime(`Na miejscu o ${convertedTime.format("HH:mm")}`);
      setIsTimeCalculated(true);
    } else if (daysDiff <= 1) {
      setTime(`Na miejscu już jutro`);
      setIsTimeCalculated(true);
    } else if (daysDiff > 1) {
      setTime(`Na miejscu za ${Math.ceil(daysDiff)} dni`);
      setIsTimeCalculated(true);
    }
  }, [daysDiff, convertedTime, timeMultiplier]);

  useEffect(() => {
    if (type !== "walk" && totalDistance !== 0) {
      setPriceLocally((5 + priceMultiplier * totalDistance).toFixed(2));
      if (isDiscountNow) {
        setDiscountedPrice((price * (discountValue / 100)).toFixed(2));
      }
      setIsPriceCalculated(true);
    } else if (type === "walk" && totalDistance !== 0) {
      setIsPriceCalculated(true);
    }
  }, [
    type,
    totalDistance,
    priceMultiplier,
    isDiscountNow,
    price,
    discountValue,
  ]);

  useEffect(() => {
    if (isItemSelected) {
      if (isDiscountNow && type !== "walk") {
        dispatch(setPrice(discountedPrice));
      } else {
        dispatch(setPrice(price));
      }
    }
  }, [isItemSelected, isDiscountNow, type, dispatch, discountedPrice, price]);

  const chooseHandler = () => {
    dispatch(setSelectedItem(type));
    if (isDiscountNow) {
      dispatch(setPrice(discountedPrice));
    } else {
      dispatch(setPrice(price));
    }
  };

  return (
    <div
      className={`flex justify-between items-center w-full h-[75px] mt-[5px] rounded-[10px] cursor-pointer ${
        !isItemSelected && "hover:bg-gray-100"
      }  ${isItemSelected && "bg-gray-200"}`}
      onClick={chooseHandler}
    >
      <div className="flex items-center h-full">
        <div className="flex items-center px-[15px] py-[10px] h-full w-[90px]">
          <img
            className="h-full w-full"
            src={`/imgs/svgs/${vechicleImage}.svg`}
            alt="Transport type"
          />
        </div>
        <div>
          <p className="font-bold text-[18px]">Taxi{name}</p>
          <p className="text-[16px]">
            {isTimeCalculated ? time : <Skeleton />}
          </p>
        </div>
      </div>
      <div className="mr-[10px]">
        {isDiscountNow && type !== "walk" ? (
          <div className="flex-col items-end">
            <div className="flex items-center justify-center">
              <IoMdPricetag color="#2EAA68" className="mr-[5px]" />
              <p className="font-bold text-[20px]">
                {isPriceCalculated ? discountedPrice : <Skeleton />}
              </p>
            </div>
            <p className="line-through text-right">
              {isPriceCalculated && price ? price : <Skeleton />}
            </p>
          </div>
        ) : (
          <p className="font-bold text-[20px]">
            {type === "walk" && isPriceCalculated && "FREE"}
            {type === "walk" && !isPriceCalculated && <Skeleton width="50px" />}
            {type !== "walk" && isPriceCalculated && price + "zł"}
            {type !== "walk" && !isPriceCalculated && <Skeleton width="50px" />}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchOrderItem;
