import axios from "axios";

const addOrder = async (userId, orderData) => {
  const url = "http://localhost:5000/api/orders/add";

  const order = orderData;

  const res = axios.post(url, { userId, order }, { withCredentials: true });
};

export default addOrder;
