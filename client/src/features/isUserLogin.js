import axios from "axios";

const isUserLoggedIn = async () => {
  const isLoggedIn = await axios.get("http://localhost:5000/isAuth");
  return isLoggedIn.data;
};

export default isUserLoggedIn;
