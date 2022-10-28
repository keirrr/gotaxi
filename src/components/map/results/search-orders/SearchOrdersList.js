import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

import moment from "moment";

const SearchOrdersList = () => {
  const routeInfo = useSelector((state) => state.locationInfo);
  const { totalDistance, totalTime } = routeInfo;

  const convertedTime = moment()
    .add(totalTime, "seconds")
    .add(4, "minutes")
    .format("HH:mm");

  const price = (5 + totalDistance).toFixed(2);

  return (
    <div className="flex justify-between items-center w-full h-[75px] mt-[5px] bg-gray-200 rounded-[10px]">
      <div className="flex items-center">
        <div className="flex items-center p-[15px]">
          <img
            className="h-12"
            src="/imgs/svgs/taxi.svg"
            alt="Transport type"
          />
        </div>
        <div>
          <p className="font-bold text-[18px]">TaxiRegular</p>
          <p className="text-[16px]">Na miejscu o {convertedTime}</p>
        </div>
      </div>
      <div className="mr-[10px]">
        <p className="font-bold text-[20px]">{price}zł</p>
      </div>
    </div>
  );
};

export default SearchOrdersList;
