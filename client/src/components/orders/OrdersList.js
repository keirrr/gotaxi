import OrderItem from "./OrderItem";

const OrdersList = (props) => {
  const { orders } = props;
  return (
    <div className="max-h-[425px] overflow-y-scroll scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      {orders.map((info) => (
        <OrderItem
          key={info.id}
          startLocationName={info.startName}
          destLocationName={info.destName}
          orderDate={info.date}
          orderPrice={info.price}
        />
      ))}
    </div>
  );
};

export default OrdersList;
