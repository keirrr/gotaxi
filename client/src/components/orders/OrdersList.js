import OrderItem from "./OrderItem";

const OrdersList = () => {
  return (
    <div className="max-h-[425px] overflow-y-scroll scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      <OrderItem
        startLocationName="Warszawska 13, Katowice"
        destLocationName="Mariacka 27, Katowice"
        orderDate="07.12.2022, 14:34"
        orderPrice="23.83zł"
      />
      <OrderItem
        startLocationName="Warszawska 13, Katowice"
        destLocationName="Mariacka 27, Katowice"
        orderDate="07.12.2022, 14:34"
        orderPrice="23.83zł"
      />
      <OrderItem
        startLocationName="Warszawska 13, Katowice"
        destLocationName="Mariacka 27, Katowice"
        orderDate="07.12.2022, 14:34"
        orderPrice="23.83zł"
      />
      <OrderItem
        startLocationName="Warszawska 13, Katowice"
        destLocationName="Mariacka 27, Katowice"
        orderDate="07.12.2022, 14:34"
        orderPrice="23.83zł"
      />
      <OrderItem
        startLocationName="Warszawska 13, Katowice"
        destLocationName="Mariacka 27, Katowice"
        orderDate="07.12.2022, 14:34"
        orderPrice="23.83zł"
      />
    </div>
  );
};

export default OrdersList;
