// Redux
import { useSelector } from "react-redux";

import moment from "moment";

const SearchOrderItem = (props) => {
  const { type } = props;

  const routeInfo = useSelector((state) => state.locationInfo);
  const { totalDistance, totalTime } = routeInfo;

  let convertedTime, price;

  let timeMultipler = 1;
  let priceMultipler = 1;
  let vechicleImage = "taxi";
  let name = type.charAt(0).toUpperCase() + type.slice(1);

  switch (type) {
    case "comfort":
      priceMultipler = 1.2;
      break;

    case "express":
      timeMultipler = 0.6;
      priceMultipler = 1.4;
      vechicleImage = "police";
      break;

    case "walk":
      vechicleImage = "walk";
      break;

    default:
      break;
  }

  if (type === "walk") {
    convertedTime = moment().add(totalDistance * 10, "minutes");
  } else {
    convertedTime = moment()
      .add(totalTime * timeMultipler, "seconds")
      .add(4, "minutes");
  }

  const todayDate = moment();
  const daysDiff = convertedTime.diff(todayDate, "days", true);

  let timeString;
  if (daysDiff < 1) {
    timeString = `Na miejscu o ${convertedTime.format("HH:mm")}`;
  } else if (daysDiff <= 1) {
    timeString = `Na miejscu już jutro`;
  } else if (daysDiff > 1) {
    timeString = `Na miejscu za ${Math.ceil(daysDiff)} dni`;
  }

  if (type === "walk") {
    price = "FREE";
  } else {
    price = (5 + priceMultipler * totalDistance).toFixed(2);
  }

  return (
    <div className="flex justify-between items-center w-full h-[75px] mt-[5px] rounded-[10px] cursor-pointer hover:bg-gray-100">
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
          <p className="text-[16px]">{timeString}</p>
        </div>
      </div>
      <div className="mr-[10px]">
        <p className="font-bold text-[20px]">
          {type === "walk" ? price : price + "zł"}
        </p>
      </div>
    </div>
  );
};

export default SearchOrderItem;
