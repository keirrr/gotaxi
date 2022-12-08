import moment from "moment";
import "moment/locale/pl";

// Icons
import {
  IoLocationSharp,
  IoArrowDown,
  IoCalendarNumber,
} from "react-icons/io5";

import { RiMoneyDollarCircleFill } from "react-icons/ri";

const OrderItem = (props) => {
  const { startLocationName, destLocationName, orderDate, orderPrice } = props;

  moment.locale("pl");
  const formatedOrderDate = moment(orderDate).format("lll");

  return (
    <div className="pr-[15px]">
      <div className="flex flex-col w-full mt-[5px] bg-gray-200 rounded-[10px]">
        {/* Date */}
        <div className="flex p-[10px]">
          <IoCalendarNumber color="#111827" className="w-[24px] h-[24px]" />
          <p className="pl-[10px]">{formatedOrderDate}</p>
        </div>

        {/* Location */}
        <div className="flex justify-between items-center w-full">
          <div className="flex">
            <div className="flex items-center p-[10px]">
              <IoLocationSharp color="#111827" className="w-[24px] h-[24px]" />
            </div>
            <div className="flex flex-col items-start">
              <p>{startLocationName}</p>
              <p>{destLocationName}</p>
            </div>
          </div>

          <div className="flex items-center p-[10px]">
            <IoArrowDown color="#111827" className="w-[24px] h-[24px]" />
          </div>
        </div>

        {/* Price */}
        <div className="flex p-[10px]">
          <RiMoneyDollarCircleFill
            color="#111827"
            className="w-[24px] h-[24px]"
          />
          <p className="pl-[10px]">{orderPrice}zł</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
